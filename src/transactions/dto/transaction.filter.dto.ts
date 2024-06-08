import { T } from '@common';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionFilterDto {
  @ApiProperty({ required: false, enum: T.TransactionKind })
  transactionKind?: T.TransactionKind;

  @ApiProperty({ required: false, enum: T.TransactionType })
  transactionType?: T.TransactionType;

  @ApiProperty({ required: false, type: Date, example: '2024-01-31' })
  fromDate?: Date;

  @ApiProperty({ required: false, type: Date, example: '2024-12-31' })
  toDate?: Date;
}
