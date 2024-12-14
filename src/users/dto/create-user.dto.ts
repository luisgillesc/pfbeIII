import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @IsString()
  @MinLength(6)
  password: string;
}

