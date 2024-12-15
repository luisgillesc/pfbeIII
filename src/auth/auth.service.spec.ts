import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockedJwtToken'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should return a token when registration is successful', async () => {
    const registerDto: RegisterUserDto = {
      email: 'user@example.com',
      password: 'password123',
      first_name: 'John',
      last_name: 'Doe',
    };

    jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashedPassword123'));
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

    const userMock: User = {
      _id: '1234567890',
      email: 'user@example.com',
      first_name: 'John',
      last_name: 'Doe',
      password: 'hashedPassword123',
    } as unknown as User;

    jest.spyOn(usersService, 'create').mockResolvedValue(userMock);

    const result = await authService.register(registerDto);

    expect(usersService.findByEmail).toHaveBeenCalledWith(registerDto.email);
    expect(bcrypt.hash).toHaveBeenCalledWith(registerDto.password, 10);
    expect(usersService.create).toHaveBeenCalledWith({
      email: registerDto.email,
      password: 'hashedPassword123',
      first_name: registerDto.first_name,
      last_name: registerDto.last_name,
    });
    expect(result).toEqual({ accessToken: 'mockedJwtToken' });
  });
});
