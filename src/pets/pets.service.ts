import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet, PetDocument } from './schemas/pet.schema';
import { CreatePetDto } from './dto/create-pet.dto';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pet.name) private petModel: Model<Pet>) {}

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const newPet = new this.petModel(createPetDto);
    return newPet.save();
  }

  async findAll(): Promise<Pet[]> {
    return this.petModel.find().exec();
  }

  async findById(id: string): Promise<Pet> {
    const pet = await this.petModel.findById(id).exec();
    if (!pet) {
      throw new NotFoundException(`Pet not found with ID: ${id}`);
    }
    return pet;
  }

  async update(id: string, pet: Partial<Pet>): Promise<Pet> {
    const updatedPet = await this.petModel.findByIdAndUpdate(id, pet, { new: true }).exec();
    if (!updatedPet) {
      throw new NotFoundException(`Pet not found with ID: ${id}`);
    }
    return updatedPet;
  }

  async delete(id: string): Promise<Pet> {
    const deletedPet = await this.petModel.findByIdAndDelete(id).exec();
    if (!deletedPet) {
      throw new NotFoundException(`Pet not found with ID: ${id}`);
    }
    return deletedPet;
  }
}
