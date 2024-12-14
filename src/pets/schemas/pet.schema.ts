import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PetDocument = Pet & Document;

@Schema()
export class Pet extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  specie: string;

  @Prop()
  birthDate: Date;

  @Prop({ default: false })
  adopted: boolean;

  @Prop()
  image: string;

  @Prop({ type: String })
  owner: string; // Relación con el usuario, puede ser un ObjectId
}

export const PetSchema = SchemaFactory.createForClass(Pet);
