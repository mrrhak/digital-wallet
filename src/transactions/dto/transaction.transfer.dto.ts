import { ApiProperty } from '@nestjs/swagger';
import { TransactionInputDto } from './transaction.input.dto';
import { IsNotEmpty } from 'class-validator';

export class TransactionTransferDto extends TransactionInputDto {
  @ApiProperty()
  @IsNotEmpty()
  sourceWalletId!: string;

  @ApiProperty()
  @IsNotEmpty()
  destinationWalletId!: string;
}
