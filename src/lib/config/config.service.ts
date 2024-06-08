import { Injectable, Logger } from '@nestjs/common';
import { Config } from './config';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

@Injectable()
export class ConfigService {
  readonly env: Config;
  private readonly envConfig: { [prop: string]: string };

  constructor() {
    this.envConfig = process.env as any;
    this.env = this.validate('ConfigModule', Config);
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  validate<T>(module: string, className: new () => T): T {
    const config = plainToClass(className as any, this.envConfig);
    const errors = validateSync(config as any, {
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    });
    if (errors.length > 0) {
      errors.forEach((e) =>
        Logger.error(`${e.constraints[Object.keys(e.constraints)[0]]}`, module),
      );
    }
    return config as any;
  }
}
