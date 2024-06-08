import { T } from '@common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';
@Schema({ id: true, timestamps: true, versionKey: false })
export class Currency {
  @ApiProperty({ required: true })
  _id!: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  name!: string;

  @ApiProperty({ required: true })
  @Prop({
    enum: Object.values(T.CurrencyCodeEnum),
    unique: true,
    required: true,
  })
  code!: string;

  @ApiProperty({ required: true })
  @Prop({ enum: Object.values(T.CurrencySymbolEnum), required: true })
  symbol!: string;

  @ApiProperty({ required: true })
  @Prop({ type: Number, required: true })
  ratio!: number;

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
export const CurrencySchema = SchemaFactory.createForClass(Currency);
export type CurrencyDocument = HydratedDocument<Currency>;
