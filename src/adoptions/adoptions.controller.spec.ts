import { Test, TestingModule } from '@nestjs/testing';
import { AdoptionsController } from './adoptions.controller';
import { AdoptionsService } from './adoptions.service';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { Adoption } from './schemas/adoption.schema';

describe('AdoptionsController', () => {
  let controller: AdoptionsController;
  let service: AdoptionsService;

  const mockAdoption: Adoption = {
    _id: '1',
    pet: 'petId',
    owner: 'ownerId',
  } as Adoption;

  const adoptionsServiceMock = {
    create: jest.fn().mockResolvedValue(mockAdoption),
    findAll: jest.fn().mockResolvedValue([mockAdoption]),
    findById: jest.fn().mockResolvedValue(mockAdoption),
    delete: jest.fn().mockResolvedValue(mockAdoption),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdoptionsController],
      providers: [
        {
          provide: AdoptionsService,
          useValue: adoptionsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AdoptionsController>(AdoptionsController);
    service = module.get<AdoptionsService>(AdoptionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new adoption', async () => {
    const createAdoptionDto: CreateAdoptionDto = {
      pet: 'petId',
      owner: 'ownerId',
    };

    const result = await controller.create(createAdoptionDto);
    expect(result).toEqual(mockAdoption);
    expect(service.create).toHaveBeenCalledWith(createAdoptionDto);
  });

  it('should return all adoptions', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockAdoption]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return an adoption by ID', async () => {
    const id = '1';
    const result = await controller.findById(id);
    expect(result).toEqual(mockAdoption);
    expect(service.findById).toHaveBeenCalledWith(id);
  });

  it('should delete an adoption by ID', async () => {
    const id = '1';
    const result = await controller.delete(id);
    expect(result).toEqual(mockAdoption);
    expect(service.delete).toHaveBeenCalledWith(id);
  });
});
