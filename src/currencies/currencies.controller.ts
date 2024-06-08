import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCurrencyDto } from './dto/currency.create.dto';
import { CurrenciesService } from './currencies.service';
import { UpdateCurrencyDto } from './dto/currency.update.dto';
import { Currency } from 'src/schema/currency.schema';

@ApiTags('Currency')
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  @ApiResponse({ status: 200, type: Currency, isArray: true })
  async getCurrencies(): Promise<Currency[]> {
    return this.currenciesService.findAll();
  }

  @Post()
  @ApiResponse({ status: 201, type: Currency })
  async createCurrencies(@Body() input: CreateCurrencyDto): Promise<Currency> {
    try {
      return await this.currenciesService.create(input);
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Currency already exists');
      }
      throw error;
    }
  }

  @Patch(':currencyId')
  @ApiResponse({ status: 200, type: Currency })
  async updateCurrencies(
    @Param('currencyId') id: string,
    @Body() input: UpdateCurrencyDto,
  ): Promise<Currency> {
    return this.currenciesService.update(id, input);
  }
}
