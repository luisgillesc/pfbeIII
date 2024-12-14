import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateAdoptionDto {
  @ApiProperty({ example: '64c9a2e5e8b7b2f837d0c1f1', description: 'ID of the owner (User)', required: true })
  @IsMongoId({ message: 'owner must be a valid MongoID' })
  @IsNotEmpty({ message: 'owner is required' })
  owner: string;

  @ApiProperty({ example: '64d0b2f9e7b3b2a547d0c2f2', description: 'ID of the pet', required: true })
  @IsMongoId({ message: 'pet must be a valid MongoID' })
  @IsNotEmpty({ message: 'pet is required' })
  pet: string;
}
