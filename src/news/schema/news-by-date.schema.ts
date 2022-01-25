/* eslint-disable @typescript-eslint/ban-types */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class NewsByDate {
  @Prop({ type: Number })
  totalResults: number;

  @Prop()
  articles: [object];
}

export const NewsByDateSchema = SchemaFactory.createForClass(NewsByDate);
