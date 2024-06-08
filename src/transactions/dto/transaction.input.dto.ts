import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class TransactionInputDto {
  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  amount!: number;

  @ApiProperty({ required: false, type: String })
  description?: string;
}
