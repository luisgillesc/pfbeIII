import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const authServiceMock = {
      login: jest.fn().mockResolvedValue({ accessToken: 'test-token' }),
      register: jest.fn().mockResolvedValue({ accessToken: 'test-token' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should return an access token on login', async () => {
    const loginDto: LoginDto = { email: 'user@example.com', password: 'password123' };
    expect(await authController.login(loginDto)).toEqual({ accessToken: 'test-token' });
  });

  it('should return an access token on register', async () => {
    const registerDto: RegisterUserDto = {
      email: 'user@example.com',
      password: 'password123',
      first_name: 'John',
      last_name: 'Doe',
    };
    expect(await authController.register(registerDto)).toEqual({ accessToken: 'test-token' });
  });
});
