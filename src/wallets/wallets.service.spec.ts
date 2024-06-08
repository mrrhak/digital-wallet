import { Test, TestingModule } from '@nestjs/testing';
import { WalletsService } from './wallets.service';
import { getModelToken } from '@nestjs/mongoose';
import { Wallet } from 'src/schema/wallet.schema';
import { Model } from 'mongoose';

describe('WalletsService', () => {
  let service: WalletsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletsService,
        {
          provide: getModelToken(Wallet.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<WalletsService>(WalletsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
