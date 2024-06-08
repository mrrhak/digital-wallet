import { T } from '@common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';
@Schema({ id: true, timestamps: true, versionKey: false })
export class Wallet {
  @ApiProperty({ required: true })
  _id!: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  name!: string;

  @ApiProperty({ required: true, default: 0 })
  @Prop({ type: Number, required: true, default: 0 })
  balance!: number;

  @ApiProperty({ required: true })
  @Prop({
    enum: Object.values(T.WalletStatus),
    required: true,
    default: T.WalletStatus.ACTIVE,
  })
  status!: T.WalletStatus;

  @ApiProperty({ required: true })
  @Prop({ type: Types.ObjectId, required: true })
  currencyId!: string;

  @ApiProperty({ required: true })
  @Prop({ type: Types.ObjectId, required: true })
  userId!: string;

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
export const WalletSchema = SchemaFactory.createForClass(Wallet);
export type WalletDocument = HydratedDocument<Wallet>;
