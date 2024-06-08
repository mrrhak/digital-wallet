import { OmitType } from '@nestjs/swagger';
import { CreateWalletDto } from './wallet.create.dto';

export class UpdateWalletDto extends OmitType(CreateWalletDto, [
  'currencyId',
  'userId',
] as const) {}
