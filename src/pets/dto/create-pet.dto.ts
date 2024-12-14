import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePetDto {
  @ApiProperty({ example: 'Firulais', description: 'The name of the pet' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Dog', description: 'The species of the pet' })
  @IsString()
  specie: string;

  @ApiProperty({ example: '2023-01-01', description: 'The birth date of the pet', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date) // Transforma el valor a una instancia de Date
  birthDate?: Date;

  @ApiProperty({ example: false, description: 'Whether the pet is adopted', required: false })
  @IsOptional()
  @IsBoolean()
  adopted?: boolean;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'The image URL of the pet', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: '64c9a2e5e8b7b2f837d0c1f1', description: 'The owner ID of the pet', required: false })
  @IsOptional()
  @IsString()
  owner?: string;
}
