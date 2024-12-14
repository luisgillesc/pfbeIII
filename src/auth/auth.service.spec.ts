import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUser = {
    _id: '1',
    email: 'user@example.com',
    first_name: 'John',
    last_name: 'Doe',
    password: 'hashedPassword123',
  };

  const usersServiceMock = {
    create: jest.fn().mockResolvedValue(mockUser),
    findByEmail: jest.fn().mockResolvedValue(null), // Simulando que no existe el usuario
  };

  const jwtServiceMock = {
    sign: jest.fn().mockReturnValue('test-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
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

    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword123');

    const result = await authService.register(registerDto);

    expect(result).toEqual({ accessToken: 'test-token' });
    expect(usersService.findByEmail).toHaveBeenCalledWith(registerDto.email);
    expect(usersService.create).toHaveBeenCalledWith({
      ...registerDto,
      password: 'hashedPassword123',
    });
    expect(jwtService.sign).toHaveBeenCalledWith({ email: registerDto.email, sub: mockUser._id });
  });
});
