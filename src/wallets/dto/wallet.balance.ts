import { ApiProperty } from '@nestjs/swagger';

export class WalletBalance {
  @ApiProperty({ type: String })
  walletId!: string;

  @ApiProperty({ type: Number })
  balance!: number;
}
