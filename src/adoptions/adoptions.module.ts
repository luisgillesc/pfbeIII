import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdoptionsService } from './adoptions.service';
import { AdoptionsController } from './adoptions.controller';
import { Adoption, AdoptionSchema } from './schemas/adoption.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Adoption.name, schema: AdoptionSchema }])],
  controllers: [AdoptionsController],
  providers: [AdoptionsService],
})
export class AdoptionsModule {}
