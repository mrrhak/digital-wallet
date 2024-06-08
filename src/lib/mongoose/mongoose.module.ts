import { Global, Module } from '@nestjs/common';
import { MongooseService } from './mongoose.service';
import { MongooseModule as _MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [_MongooseModule.forRootAsync({ useClass: MongooseService })],
  exports: [_MongooseModule],
})
export class MongooseModule {}
