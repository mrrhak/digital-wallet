import { Types } from 'mongoose';
import { Currency } from 'src/schema/currency.schema';

export const getObjectId = (text?: string) => {
  if (text) return new Types.ObjectId(text);
  else return new Types.ObjectId();
};

export const currencyConverter = (
  sourceCurrency: Currency,
  destinationCurrency: Currency,
  amount: number,
): number => {
  return (sourceCurrency.ratio / destinationCurrency.ratio) * amount;
};
