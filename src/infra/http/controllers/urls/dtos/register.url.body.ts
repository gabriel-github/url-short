import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterUrlBody {
  @ApiProperty({
    description: 'URL to be shortened',
    example: 'https://www.google.com',
  })
  @IsNotEmpty()
  originalUrl: string;
}
