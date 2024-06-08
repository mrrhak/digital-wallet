import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class Config {
  @IsNotEmpty()
  NODE_ENV!: string;

  @IsNotEmpty()
  @Transform((x) => +x)
  PORT!: number;
}
