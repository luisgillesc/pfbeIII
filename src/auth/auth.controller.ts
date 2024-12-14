import { Controller, Post, Body, Get, UseGuards, Req,HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado correctamente.', type: TokenDto })
  async register(@Body() registerUserDto: RegisterUserDto): Promise<TokenDto> {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Sesión iniciada correctamente.', type: TokenDto })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  @HttpCode(HttpStatus.OK) // Esto asegura que el código de estado sea 200
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    return this.authService.login(loginDto);
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Verificar sesión actual' })
  @ApiBearerAuth() // Indica a Swagger que este endpoint necesita un token Bearer
  @ApiResponse({ status: 200, description: 'Sesión verificada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async verify(@Req() req: any) {
    return req.user;
  }
}
