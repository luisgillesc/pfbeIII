import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Adoption extends Document {
  @Prop({ required: true, type: String })
  owner: string;

  @Prop({ required: true, type: String })
  pet: string;
}

export const AdoptionSchema = SchemaFactory.createForClass(Adoption);
