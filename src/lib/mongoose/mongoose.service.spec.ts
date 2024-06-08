import { Test, TestingModule } from '@nestjs/testing';
import { MongooseService } from './mongoose.service';
import { ConfigModule } from '@lib/config';

describe('MongooseService', () => {
  let service: MongooseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [MongooseService],
    }).compile();

    service = module.get<MongooseService>(MongooseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
