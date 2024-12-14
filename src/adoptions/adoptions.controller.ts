import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { AdoptionsService } from './adoptions.service';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { Adoption } from './schemas/adoption.schema';

@ApiTags('Adoptions')
@Controller('adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new adoption' })
  @ApiResponse({ status: 201, description: 'Adoption created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiBody({ type: CreateAdoptionDto })
  async create(@Body() createAdoptionDto: CreateAdoptionDto): Promise<Adoption> {
    return this.adoptionsService.create(createAdoptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all adoptions' })
  @ApiResponse({ status: 200, description: 'List of adoptions.' })
  async findAll(): Promise<Adoption[]> {
    return this.adoptionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an adoption by ID' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the adoption' })
  @ApiResponse({ status: 200, description: 'The adoption with the given ID.' })
  @ApiResponse({ status: 404, description: 'Adoption not found.' })
  async findById(@Param('id') id: string): Promise<Adoption> {
    return this.adoptionsService.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an adoption by ID' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the adoption to delete' })
  @ApiResponse({ status: 200, description: 'Adoption deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Adoption not found.' })
  async delete(@Param('id') id: string): Promise<Adoption> {
    return this.adoptionsService.delete(id);
  }
}
