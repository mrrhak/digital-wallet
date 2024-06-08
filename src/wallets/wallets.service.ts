import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Wallet, WalletDocument } from 'src/schema/wallet.schema';
import { CreateWalletDto } from './dto/wallet.create.dto';
import { UpdateWalletDto } from './dto/wallet.update.dto';
import { WalletStatus } from 'src/common/types';
import { WalletBalance } from './dto/wallet.balance';
import { CurrenciesService } from 'src/currencies/currencies.service';
import {
  Transaction,
  TransactionDocument,
} from 'src/schema/transaction.schema';
import { Global } from '@common';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<WalletDocument>,
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
    private readonly currencyService: CurrenciesService,
  ) {}

  async findOne(id: string): Promise<Wallet> {
    const wallet = await this.walletModel.findById(id);
    if (!wallet) throw new NotFoundException('Wallet not found');
    return wallet;
  }

  async create(
    input: CreateWalletDto,
    session?: ClientSession,
  ): Promise<Wallet> {
    const currency = await this.currencyService.findOne(input.currencyId);
    if (!currency) throw new NotFoundException('Currency not found');

    const walletExists = await this.walletModel.findOne({
      userId: input.userId,
      currencyId: input.currencyId,
    });
    if (walletExists) throw new BadRequestException('Wallet already exists');
    // start session and transaction
    let isNewSession = false;
    if (!session) {
      session = await this.walletModel.db.startSession();
      session.startTransaction();
      isNewSession = true;
    }
    try {
      const wallets = await this.walletModel.create(
        [
          {
            createdBy: 'KimHak',
            ...input,
          },
        ],
        { session },
      );
      // commit transaction
      if (isNewSession) {
        await session.commitTransaction();
      }
      return wallets[0];
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

  async update(
    id: string,
    input: UpdateWalletDto,
    session?: ClientSession,
  ): Promise<Wallet> {
    // start session and transaction
    let isNewSession = false;
    if (!session) {
      session = await this.walletModel.db.startSession();
      session.startTransaction();
      isNewSession = true;
    }
    try {
      const wallet = await this.walletModel.findByIdAndUpdate(
        { _id: id },
        input,
        {
          new: true,
          session,
        },
      );
      // commit transaction
      if (isNewSession) {
        await session.commitTransaction();
      }
      return wallet;
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

  async suspend(id: string, session?: ClientSession): Promise<Wallet> {
    // start session and transaction
    let isNewSession = false;
    if (!session) {
      session = await this.walletModel.db.startSession();
      session.startTransaction();
      isNewSession = true;
    }
    try {
      const wallet = await this.walletModel.findByIdAndUpdate(
        { _id: id },
        { status: WalletStatus.SUSPEND },
        {
          new: true,
          session,
        },
      );
      // commit transaction
      if (isNewSession) {
        await session.commitTransaction();
      }
      return wallet;
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

  async active(id: string, session?: ClientSession): Promise<Wallet> {
    // start session and transaction
    let isNewSession = false;
    if (!session) {
      session = await this.walletModel.db.startSession();
      session.startTransaction();
      isNewSession = true;
    }
    try {
      const wallet = await this.walletModel.findByIdAndUpdate(
        { _id: id },
        { status: WalletStatus.ACTIVE },
        {
          new: true,
          session,
        },
      );
      // commit transaction
      if (isNewSession) {
        await session.commitTransaction();
      }
      return wallet;
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

  async getBalance(id: string): Promise<WalletBalance> {
    const wallet = await this.walletModel.findById(id);
    return {
      walletId: wallet._id,
      balance: wallet.balance,
    };
  }

  async isActive(id: string): Promise<boolean> {
    const wallet = await this.walletModel.findById(id);
    return wallet.status === WalletStatus.ACTIVE;
  }

  async creditBalance(
    id: string,
    amount: number,
    session?: ClientSession,
  ): Promise<Wallet> {
    const wallet = await this.walletModel.findById(id);
    // start session and transaction
    let isNewSession = false;
    if (!session) {
      session = await this.walletModel.db.startSession();
      session.startTransaction();
      isNewSession = true;
    }
    try {
      wallet.balance += amount;
      await wallet.save({ session });
      // commit transaction
      if (isNewSession) {
        await session.commitTransaction();
      }
      return wallet;
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

  async debitBalance(
    id: string,
    amount: number,
    session?: ClientSession,
  ): Promise<Wallet> {
    const wallet = await this.walletModel.findById(id);
    if (wallet.balance - amount < 0) {
      throw new BadRequestException('Insufficient balance');
    }
    // start session and transaction
    let isNewSession = false;
    if (!session) {
      session = await this.walletModel.db.startSession();
      session.startTransaction();
      isNewSession = true;
    }
    try {
      wallet.balance -= amount;
      await wallet.save({ session });
      // commit transaction
      if (isNewSession) {
        await session.commitTransaction();
      }

      return wallet;
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

  async transferBalance(
    sourceWalletId: string,
    destinationWalletId: string,
    amount: number,
    session?: ClientSession,
  ): Promise<number> {
    const walletSource = await this.walletModel.findById(sourceWalletId);
    if (!walletSource) {
      throw new NotFoundException('Source wallet not found');
    }
    const walletDestination =
      await this.walletModel.findById(destinationWalletId);
    if (!walletDestination) {
      throw new NotFoundException('Destination wallet not found');
    }

    if (walletSource.balance - amount < 0) {
      throw new BadRequestException('Insufficient balance');
    }
    const currencySource = await this.currencyService.findOne(
      walletSource.currencyId,
    );
    const currencyDestination = await this.currencyService.findOne(
      walletDestination.currencyId,
    );

    const destinationAmount = Global.currencyConverter(
      currencySource,
      currencyDestination,
      amount,
    );
    // start session and transaction
    let isNewSession = false;
    if (!session) {
      session = await this.walletModel.db.startSession();
      session.startTransaction();
      isNewSession = true;
    }

    try {
      walletSource.balance -= amount;
      walletDestination.balance += destinationAmount;
      await Promise.all([
        walletSource.save({ session }),
        walletDestination.save({ session }),
      ]);
      // commit transaction
      if (isNewSession) {
        await session.commitTransaction();
      }
      return destinationAmount;
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

  async getTransactions(walletId: string): Promise<Transaction[]> {
    return await this.transactionModel
      .find({ walletId })
      .sort({ createdAt: -1 })
      .exec();
  }
}
