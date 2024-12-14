import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PetsService } from './pets.service';
import { Pet } from './schemas/pet.schema';
import { CreatePetDto } from './dto/create-pet.dto';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pet' })
  @ApiResponse({ status: 201, description: 'Pet created successfully.' })
  @ApiBody({ type: CreatePetDto })
  async create(@Body() createPetDto: CreatePetDto): Promise<Pet> {
    return this.petsService.create(createPetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pets' })
  @ApiResponse({ status: 200, description: 'List of pets.' })
  async findAll() {
    return this.petsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a pet by ID' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the pet' })
  @ApiResponse({ status: 200, description: 'The pet with the given ID.' })
  async findById(@Param('id') id: string) {
    return this.petsService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a pet by ID' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the pet to update' })
  @ApiBody({ type: CreatePetDto }) // Especifica el request body para el update
  async update(@Param('id') id: string, @Body() pet: Partial<Pet>) {
    return this.petsService.update(id, pet);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a pet by ID' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the pet to delete' })
  async delete(@Param('id') id: string) {
    return this.petsService.delete(id);
  }
}
