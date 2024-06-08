import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';
import { Wallet } from './wallet.schema';
import { T } from '@common';
@Schema({ id: true, timestamps: true, versionKey: false })
export class Transaction {
  @ApiProperty({ required: true })
  _id?: string;

  @ApiProperty({ required: true })
  @Prop({ type: Types.ObjectId, required: true })
  walletId!: string;

  @ApiProperty({ required: true })
  @Prop({ type: Wallet, required: true })
  wallet!: Wallet;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, default: '' })
  description?: string;

  @ApiProperty({ required: true })
  @Prop({ type: Number, required: true, default: 0 })
  amount!: number;

  @ApiProperty({ required: true })
  @Prop({ enum: Object.values(T.TransactionKind), required: true })
  kind!: string;

  @ApiProperty({ required: true })
  @Prop({ enum: Object.values(T.TransactionType), required: true })
  type!: string;

  @ApiProperty({ required: false, default: null })
  @Prop({ type: Object, default: null })
  meta?: object;

  @ApiProperty({ required: true })
  @Prop({ type: Types.ObjectId, required: true })
  createdBy!: string;

  @ApiProperty({ required: true, default: null })
  @Prop({ type: Date, default: null })
  createdAt?: Date;

  @ApiProperty({ required: false, default: null, type: Types.ObjectId })
  @Prop({ type: Types.ObjectId, default: null })
  updatedBy?: string;

  @ApiProperty({ required: false, default: null })
  @Prop({ type: Date, default: null })
  updatedAt?: Date;
}
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
export type TransactionDocument = HydratedDocument<Transaction>;
