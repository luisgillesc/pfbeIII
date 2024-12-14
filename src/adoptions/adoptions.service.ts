import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Adoption } from './schemas/adoption.schema';
import { CreateAdoptionDto } from './dto/create-adoption.dto';

@Injectable()
export class AdoptionsService {
  private readonly logger = new Logger(AdoptionsService.name);

  constructor(@InjectModel(Adoption.name) private adoptionModel: Model<Adoption>) {}

  async create(createAdoptionDto: CreateAdoptionDto): Promise<Adoption> {
    this.logger.log('Creating a new adoption', JSON.stringify(createAdoptionDto));
    const newAdoption = new this.adoptionModel(createAdoptionDto);
    return newAdoption.save();
  }

  async findAll(): Promise<Adoption[]> {
    this.logger.log('Retrieving all adoptions');
    return this.adoptionModel.find().exec();
  }

  async findById(id: string): Promise<Adoption> {
    this.logger.log(`Finding adoption by ID: ${id}`);
    const adoption = await this.adoptionModel.findById(id).exec();
    if (!adoption) {
      this.logger.warn(`Adoption not found with ID: ${id}`);
      throw new NotFoundException(`Adoption not found with ID: ${id}`);
    }
    return adoption;
  }

  async delete(id: string): Promise<Adoption> {
    this.logger.log(`Deleting adoption with ID: ${id}`);
    const deletedAdoption = await this.adoptionModel.findByIdAndDelete(id).exec();
    if (!deletedAdoption) {
      this.logger.warn(`Adoption not found with ID: ${id}`);
      throw new NotFoundException(`Adoption not found with ID: ${id}`);
    }
    return deletedAdoption;
  }
}
