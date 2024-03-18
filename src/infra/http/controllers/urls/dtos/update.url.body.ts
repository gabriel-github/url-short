import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUrlBody {
  @ApiProperty({
    description: 'id of url that will be updated',
    example: '908a8b93-e8bf-4bdd-bb92-902ec866e611',
  })
  @IsNotEmpty()
  urlId: string;

  @ApiProperty({
    description: 'new destiny of url shortened',
    example: 'www.youtube.com',
  })
  @IsNotEmpty()
  newDestinyUrl: string;
}
