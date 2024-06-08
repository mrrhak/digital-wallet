import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCurrencyDto } from './dto/currency.update.dto';
import { ClientSession, Model } from 'mongoose';
import { Currency, CurrencyDocument } from 'src/schema/currency.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCurrencyDto } from './dto/currency.create.dto';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectModel(Currency.name)
    private readonly model: Model<CurrencyDocument>,
  ) {}

  async findOne(id: string): Promise<Currency> {
    const currency = await this.model.findById(id);
    if (!currency) throw new NotFoundException('Currency not found');
    return currency;
  }

  async findAll(): Promise<Currency[]> {
    return this.model.find().exec();
  }

  async create(
    input: CreateCurrencyDto,
    session?: ClientSession,
  ): Promise<Currency> {
    if (input.ratio === 0) throw new BadRequestException('Ratio cannot be 0');
    // start session and transaction
    let isNewSession = false;
    if (!session) {
      session = await this.model.db.startSession();
      session.startTransaction();
      isNewSession = true;
    }
    try {
      const currencies = await this.model.create(
        [
          {
            createdBy: 'KimHak',
            ...input,
          },
        ],
        { session },
      );
      // commit transaction
      if (isNewSession) {
        await session.commitTransaction();
      }
      return currencies[0];
    } catch (error) {
      // abort transaction
      if (isNewSession) {
        await session.abortTransaction();
      }
      throw error;
    } finally {
      // end session
      if (isNewSession) {
        session.endSession();
      }
    }
  }

  async update(
    id: string,
    input: UpdateCurrencyDto,
    session?: ClientSession,
  ): Promise<Currency> {
    if (input.ratio === 0) throw new BadRequestException('Ratio cannot be 0');
    // start session and transaction
    let isNewSession = false;
    if (!session) {
      session = await this.model.db.startSession();
      session.startTransaction();
      isNewSession = true;
    }
    try {
      const currency = await this.model.findByIdAndUpdate({ _id: id }, input, {
        new: true,
        session,
      });
      // commit transaction
      if (isNewSession) {
        await session.commitTransaction();
      }
      return currency;
    } catch (error) {
      // abort transaction
      if (isNewSession) {
        await session.abortTransaction();
      }
      throw error;
    } finally {
      // end session
      if (isNewSession) {
        session.endSession();
      }
    }
  }
}
