import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import {
  TransactionKind,
  TransactionType,
  WalletStatus,
} from 'src/common/types';
import {
  Transaction,
  TransactionDocument,
} from 'src/schema/transaction.schema';
import { TransactionCreditDto } from './dto/transaction.credit.dto';
import { TransactionDebitDto } from './dto/transaction.debit.dto';
import { TransactionTransferDto } from './dto/transaction.transfer.dto';
import { TransactionFilterDto } from './dto/transaction.filter.dto';
import { WalletsService } from 'src/wallets/wallets.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly model: Model<TransactionDocument>,
    private readonly walletService: WalletsService,
  ) {}

  async credit(
    walletId: string,
    input: TransactionCreditDto,
    session?: ClientSession,
  ): Promise<Transaction> {
    const wallet = await this.walletService.findOne(walletId);
    if (wallet.status !== WalletStatus.ACTIVE) {
      throw new BadRequestException('Wallet is unavailable');
    }
    if (input.amount === 0) {
      throw new BadRequestException('Amount cannot be zero');
    }
    // start session and transaction
    let isNewSession = false;
    if (!session) {
      session = await this.model.db.startSession();
      session.startTransaction();
      isNewSession = true;
    }
    try {
      const walletCredited = await this.walletService.creditBalance(
        walletId,
        input.amount,
        session,
      );
      const transactions = await this.model.create(
        [
          {
            walletId,
            wallet: walletCredited,
            amount: input.amount,
            description: input.description,
            kind: TransactionKind.CREDIT,
            type: TransactionType.DEPOSIT,
            createdBy: 'KimHak',
          },
        ],
        { session },
      );
      // commit transaction
      if (isNewSession) {
        await session.commitTransaction();
      }
      return transactions[0];
    } catch (e) {
      // abort transaction
      if (isNewSession) {
        await session.abortTransaction();
      }
      throw e;
    } finally {
      // end session
      if (isNewSession) {
        await session.endSession();
      }
    }
  }

  async debit(
    walletId: string,
    input: TransactionDebitDto,
    session?: ClientSession,
  ): Promise<Transaction> {
    const wallet = await this.walletService.findOne(walletId);
    if (wallet.status !== WalletStatus.ACTIVE) {
      throw new BadRequestException('Wallet is unavailable');
    }
    if (input.amount === 0) {
      throw new BadRequestException('Amount cannot be zero');
    }
    // start session and transaction
    let isNewSession = false;
    if (!session) {
      session = await this.model.db.startSession();
      session.startTransaction();
      isNewSession = true;
    }
    try {
      const walletDebited = await this.walletService.debitBalance(
        walletId,
        input.amount,
        session,
      );
      const transactions = await this.model.create(
        [
          {
            walletId,
            wallet: walletDebited,
            amount: input.amount,
            description: input.description,
            kind: TransactionKind.DEBIT,
            type: TransactionType.WITHDRAW,
            createdBy: 'KimHak',
          },
        ],
        { session },
      );
      // commit transaction
      if (isNewSession) {
        await session.commitTransaction();
      }
      return transactions[0];
    } catch (e) {
      // abort transaction
      if (isNewSession) {
        await session.abortTransaction();
      }
      throw e;
    } finally {
      // end session
      if (isNewSession) {
        await session.endSession();
      }
    }
  }

  async transfer(
    input: TransactionTransferDto,
    session?: ClientSession,
  ): Promise<Transaction> {
    const sourceWallet = await this.walletService.findOne(input.sourceWalletId);
    if (sourceWallet.status !== WalletStatus.ACTIVE) {
      throw new BadRequestException('Source wallet is unavailable');
    }
    const destinationWallet = await this.walletService.findOne(
      input.destinationWalletId,
    );
    if (destinationWallet.status !== WalletStatus.ACTIVE) {
      throw new BadRequestException('Destination wallet is unavailable');
    }
    if (input.amount === 0) {
      throw new BadRequestException('Amount cannot be zero');
    }

    // start session and transaction
    let isNewSession = false;
    if (!session) {
      session = await this.model.db.startSession();
      session.startTransaction();
      isNewSession = true;
    }
    try {
      const destinationAmount = await this.walletService.transferBalance(
        input.sourceWalletId,
        input.destinationWalletId,
        input.amount,
        session,
      );

      const date = new Date();
      const debitTransaction: Transaction = {
        walletId: input.sourceWalletId,
        wallet: sourceWallet,
        amount: input.amount,
        description: input.description,
        kind: TransactionKind.DEBIT,
        type: TransactionType.TRANSFER,
        createdBy: 'KimHak',
        createdAt: date,
        meta: {
          destinationWalletId: input.destinationWalletId,
          destinationAmount: destinationAmount,
        },
      };

      const creditTransaction: Transaction = {
        walletId: input.destinationWalletId,
        wallet: destinationWallet,
        amount: destinationAmount,
        description: input.description,
        kind: TransactionKind.CREDIT,
        type: TransactionType.TRANSFER,
        createdBy: 'KimHak',
        createdAt: date,
        meta: {
          sourceWalletId: input.sourceWalletId,
          sourceAmount: input.amount,
        },
      };

      await this.model.insertMany([debitTransaction, creditTransaction], {
        session,
      });
      // commit transaction
      if (isNewSession) {
        await session.commitTransaction();
      }
      return debitTransaction;
    } catch (error) {
      // abort transaction
      if (isNewSession) {
        await session.abortTransaction();
      }
      throw error;
    } finally {
      // end session
      if (isNewSession) {
        await session.endSession();
      }
    }
  }

  async getTransactions(
    walletId: string,
    query?: TransactionFilterDto,
  ): Promise<Transaction[]> {
    const filter = {} as any;
    if (query.transactionKind) filter.kind = query.transactionKind;
    if (query.transactionType) filter.type = query.transactionType;
    if (query.fromDate) filter.createdAt = { $gte: query.fromDate };
    if (query.toDate) filter.createdAt = { $lte: query.toDate };
    return await this.model
      .find({ walletId, ...filter })
      .sort({ createdAt: -1 })
      .exec();
  }
}
