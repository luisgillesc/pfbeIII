import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<UserDocument>;

  beforeEach(async () => {
    const userModelMock = {
      create: jest.fn().mockResolvedValue([{
        _id: '1',
        email: 'new@example.com',
        first_name: 'John',
        last_name: 'Doe',
        password: 'password123',
        __v: 0,
      }]),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should create a new user', async () => {
    const newUser = {
      email: 'new@example.com',
      first_name: 'John',
      last_name: 'Doe',
      password: 'password123',
    };

    const createdUser = {
      _id: '1',
      ...newUser,
      __v: 0,
    };

    jest.spyOn(model, 'create').mockResolvedValue([createdUser as any]);

    const result = await service.create(newUser);
    expect(result).toEqual([createdUser]);
    expect(model.create).toHaveBeenCalledWith(newUser);
  });
});
