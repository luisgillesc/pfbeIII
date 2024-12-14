import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PetsService } from './pets.service';
import { Pet, PetDocument } from './schemas/pet.schema';
import { CreatePetDto } from './dto/create-pet.dto';
import { Model } from 'mongoose';

describe('PetsService', () => {
  let service: PetsService;
  let model: Model<PetDocument>;

  const mockPet = {
    _id: '1',
    name: 'Firulais',
    specie: 'Dog',
    birthDate: new Date(),
    adopted: false,
    image: 'https://example.com/image.jpg',
    owner: 'ownerId',
    save: jest.fn().mockResolvedValue({
      _id: '1',
      name: 'Firulais',
      specie: 'Dog',
      birthDate: new Date(),
      adopted: false,
      image: 'https://example.com/image.jpg',
      owner: 'ownerId',
    }),
  };

  const petModelMock = jest.fn().mockImplementation(() => mockPet);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetsService,
        {
          provide: getModelToken(Pet.name),
          useValue: petModelMock,
        },
      ],
    }).compile();

    service = module.get<PetsService>(PetsService);
    model = module.get<Model<PetDocument>>(getModelToken(Pet.name));
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

    const result = await service.create(createPetDto);
    expect(result).toEqual({
      _id: '1',
      name: 'Firulais',
      specie: 'Dog',
      birthDate: expect.any(Date),
      adopted: false,
      image: 'https://example.com/image.jpg',
      owner: 'ownerId',
    });
    expect(petModelMock).toHaveBeenCalledWith(createPetDto);
    expect(mockPet.save).toHaveBeenCalled();
  });
});
