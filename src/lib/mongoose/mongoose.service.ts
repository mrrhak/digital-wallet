import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { MongooseConfig } from './mongoose.config';
import { ConfigService } from '../config';

@Injectable()
export class MongooseService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const config = this.configService.validate(
      'MongooseModule',
      MongooseConfig,
    );
    return {
      uri: config.MONGO_DB_URI,
      dbName: 'DigitalWallet',
    };
  }
}
