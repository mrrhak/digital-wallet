import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { Transaction } from 'src/schema/transaction.schema';
import { TransactionCreditDto } from './dto/transaction.credit.dto';
import { TransactionDebitDto } from './dto/transaction.debit.dto';
import { TransactionTransferDto } from './dto/transaction.transfer.dto';
import { TransactionFilterDto } from './dto/transaction.filter.dto';

@ApiTags('Transaction')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post(':walletId/credit')
  @ApiResponse({ status: 200, type: Transaction })
  async credit(
    @Param('walletId') id: string,
    @Body() input: TransactionCreditDto,
  ): Promise<Transaction> {
    return this.transactionsService.credit(id, input);
  }

  @Post(':walletId/debit')
  @ApiResponse({ status: 200, type: Transaction })
  async debit(
    @Param('walletId') id: string,
    @Body() input: TransactionDebitDto,
  ): Promise<Transaction> {
    return this.transactionsService.debit(id, input);
  }

  @Post('transfer')
  @ApiResponse({
    status: 200,
    type: String,
    description: 'transferred successfully!',
  })
  async transfer(@Body() input: TransactionTransferDto): Promise<string> {
    await this.transactionsService.transfer(input);
    return 'transferred successfully!';
  }

  @Get(':walletId')
  @ApiResponse({ status: 200, type: Transaction, isArray: true })
  async getTransactions(
    @Param('walletId') id: string,
    @Query() query: TransactionFilterDto,
  ): Promise<Transaction[]> {
    return await this.transactionsService.getTransactions(id, query);
  }
}
