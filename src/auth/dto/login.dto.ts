import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'El correo del usuario' })
  @IsEmail({}, { message: 'El correo debe ser válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  email: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'La contraseña del usuario' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}

