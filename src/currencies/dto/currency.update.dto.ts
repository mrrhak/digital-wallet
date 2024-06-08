import { OmitType } from '@nestjs/swagger';
import { CreateCurrencyDto } from './currency.create.dto';

export class UpdateCurrencyDto extends OmitType(CreateCurrencyDto, [
  'name',
  'code',
  'symbol',
] as const) {}
