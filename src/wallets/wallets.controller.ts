import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Wallet } from 'src/schema/wallet.schema';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/wallet.create.dto';
import { UpdateWalletDto } from './dto/wallet.update.dto';
import { WalletBalance } from './dto/wallet.balance';
import { Transaction } from 'src/schema/transaction.schema';

@ApiTags('Wallet')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletService: WalletsService) {}

  @Post()
  @ApiResponse({ status: 201, type: Wallet })
  async createWallet(@Body() input: CreateWalletDto): Promise<Wallet> {
    return await this.walletService.create(input);
  }

  @Patch(':walletId')
  @ApiResponse({ status: 200, type: Wallet })
  async updateWallet(
    @Param('walletId') id: string,
    @Body() input: UpdateWalletDto,
  ): Promise<Wallet> {
    return this.walletService.update(id, input);
  }

  @Patch(':walletId/suspend')
  @ApiResponse({ status: 200, type: Wallet })
  async suspendWallet(@Param('walletId') id: string): Promise<Wallet> {
    return this.walletService.suspend(id);
  }

  @Patch(':walletId/active')
  @ApiResponse({ status: 200, type: Wallet })
  async activeWallet(@Param('walletId') id: string): Promise<Wallet> {
    return this.walletService.active(id);
  }

  @Get(':walletId/balance')
  @ApiResponse({ status: 200, type: WalletBalance })
  async GetWalletBalance(
    @Param('walletId') id: string,
  ): Promise<WalletBalance> {
    return await this.walletService.getBalance(id);
  }

  @Get(':walletId/transactions')
  @ApiResponse({ status: 200, type: Transaction, isArray: true })
  async GetWalletTransactions(
    @Param('walletId') id: string,
  ): Promise<Transaction[]> {
    return await this.walletService.getTransactions(id);
  }
}
