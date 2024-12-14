import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // Requiere un módulo de usuarios
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<TokenDto> {
    const { email, password } = registerUserDto;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({
      ...registerUserDto,
      password: hashedPassword,
    });

    return this.generateToken(newUser);
  }

  async login(loginDto: LoginDto): Promise<TokenDto> {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.generateToken(user);
  }

  private generateToken(user: any): TokenDto {
    const payload = { sub: user._id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
