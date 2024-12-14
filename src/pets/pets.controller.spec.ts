import { Test, TestingModule } from '@nestjs/testing';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './schemas/pet.schema';

describe('PetsController', () => {
  let controller: PetsController;
  let service: PetsService;

  const mockPet: Pet = {
    _id: '1',
    name: 'Firulais',
    specie: 'Dog',
    birthDate: new Date(),
    adopted: false,
    image: 'https://example.com/image.jpg',
    owner: 'ownerId',
  } as Pet;

  const petsServiceMock = {
    create: jest.fn().mockResolvedValue(mockPet),
    findAll: jest.fn().mockResolvedValue([mockPet]),
    findById: jest.fn().mockResolvedValue(mockPet),
    update: jest.fn().mockResolvedValue(mockPet),
    delete: jest.fn().mockResolvedValue(mockPet),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsController],
      providers: [
        {
          provide: PetsService,
          useValue: petsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<PetsController>(PetsController);
    service = module.get<PetsService>(PetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new pet', async () => {
    const createPetDto: CreatePetDto = {
      name: 'Firulais',
      specie: 'Dog',
      birthDate: new Date(),
      adopted: false,
      image: 'https://example.com/image.jpg',
      owner: 'ownerId',
    };

    const result = await controller.create(createPetDto);
    expect(result).toEqual(mockPet);
    expect(service.create).toHaveBeenCalledWith(createPetDto);
  });

  it('should return all pets', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockPet]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a pet by ID', async () => {
    const id = '1';
    const result = await controller.findById(id);
    expect(result).toEqual(mockPet);
    expect(service.findById).toHaveBeenCalledWith(id);
  });

  it('should update a pet by ID', async () => {
    const id = '1';
    const updatePetDto: CreatePetDto = {
      name: 'Max',
      specie: 'Dog',
      birthDate: new Date(),
      adopted: true,
      image: 'https://example.com/image2.jpg',
      owner: 'ownerId2',
    };

    const result = await controller.update(id, updatePetDto);
    expect(result).toEqual(mockPet);
    expect(service.update).toHaveBeenCalledWith(id, updatePetDto);
  });

  it('should delete a pet by ID', async () => {
    const id = '1';
    const result = await controller.delete(id);
    expect(result).toEqual(mockPet);
    expect(service.delete).toHaveBeenCalledWith(id);
  });
});
