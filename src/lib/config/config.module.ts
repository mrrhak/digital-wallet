import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as _ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [_ConfigModule.forRoot()],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
