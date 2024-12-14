import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'John', description: 'El primer nombre del usuario' })
  @IsNotEmpty({ message: 'El primer nombre es obligatorio' })
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'El apellido del usuario' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  last_name: string;

  @ApiProperty({ example: 'user@example.com', description: 'El correo del usuario' })
  @IsEmail({}, { message: 'El correo debe ser válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  email: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'La contraseña del usuario' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}
