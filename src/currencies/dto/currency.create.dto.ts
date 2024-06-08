import { T } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCurrencyDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ required: true })
  @IsEnum(T.CurrencyCodeEnum)
  code!: string;

  @ApiProperty()
  @IsEnum(T.CurrencySymbolEnum)
  symbol!: string;

  @ApiProperty({ required: true })
  @IsNumber()
  ratio!: number;
}
