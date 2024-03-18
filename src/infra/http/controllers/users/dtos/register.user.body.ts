import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterUserBody {
  @ApiProperty({
    description: 'email to user',
    example: 'gabriel@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password to user',
    example: '123456',
  })
  @IsNotEmpty()
  password: string;
}
