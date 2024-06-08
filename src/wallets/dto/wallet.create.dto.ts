import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MaxLength(30)
  name!: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  currencyId!: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  userId!: string;
}
