import { Test, TestingModule } from '@nestjs/testing';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from 'src/schema/wallet.schema';

describe('WalletsController', () => {
  let controller: WalletsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletsController],
      providers: [
        WalletsService,
        {
          provide: getModelToken(Wallet.name),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<WalletsController>(WalletsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
