import { ApiProperty } from '@nestjs/swagger';

export class CreatePetDto {
  @ApiProperty({ example: 'Firulais', description: 'The name of the pet' })
  name: string;

  @ApiProperty({ example: 'Dog', description: 'The specie of the pet' })
  specie: string;

  @ApiProperty({ example: '2023-01-01', description: 'The birth date of the pet', required: false })
  birthDate?: Date;

  @ApiProperty({ example: false, description: 'Whether the pet is adopted', required: false })
  adopted?: boolean;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'The image URL of the pet', required: false })
  image?: string;

  @ApiProperty({ example: '64c9a2e5e8b7b2f837d0c1f1', description: 'The owner ID of the pet', required: false })
  owner?: string;
}
