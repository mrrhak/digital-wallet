import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesService } from './currencies.service';
import { Currency } from 'src/schema/currency.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const mockCurrency = {
  _id: '1',
  name: 'Dollar',
  code: 'USD',
  symbol: '$',
  ratio: 1,
  createdBy: 'KimHak',
};

describe('CurrenciesService', () => {
  let service: CurrenciesService;
  let model: Model<Currency>;

  const currenciesArray: Currency[] = [
    {
      _id: '1',
      name: 'Dollar',
      code: 'USD',
      symbol: '$',
      ratio: 1,
      createdBy: 'KimHak',
    },
    {
      _id: '2',
      name: 'Riel',
      code: 'KHR',
      symbol: '៛',
      ratio: 1,
      createdBy: 'KimHak',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrenciesService,
        {
          provide: getModelToken(Currency.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockCurrency),
            constructor: jest.fn().mockResolvedValue(mockCurrency),
            find: jest.fn().mockResolvedValue(currenciesArray),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
    model = module.get<Model<Currency>>(getModelToken(Currency.name));
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('model should be defined', () => {
    expect(model).toBeDefined();
  });

  it('should return all currencies', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(currenciesArray),
    } as any);
    const currencies = await service.findAll();
    expect(currencies).toEqual(currenciesArray);
  });

  // it('should create currency', async () => {
  //   jest.spyOn(model, 'create').mockReturnValue({
  //     create: jest.fn().mockResolvedValueOnce(mockCurrency),
  //   } as any);

  //   const currency = await service.createCurrency(mockCurrency);
  //   console.log('currency:', currency);
  //   expect(currency).toEqual(mockCurrency);
  // });
});
