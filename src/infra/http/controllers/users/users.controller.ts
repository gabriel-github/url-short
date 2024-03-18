import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { RegisterUser } from 'src/application/use-cases/user/register.user';
import { RegisterUserBody } from './dtos/register.user.body';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users controller')
@Controller('users')
export class UsersController {
  constructor(private registerUser: RegisterUser) {}

  @ApiOperation({
    summary: 'register an user',
  })
  @HttpCode(201)
  @Post('/')
  async register(@Body() body: RegisterUserBody) {
    const { email, password } = body;

    const response = await this.registerUser.execute({
      email,
      password,
    });

    if (response.isLeft()) {
      const error = response.value;
      throw new BadRequestException(error.message);
    }

    const { user } = response.value;

    return {
      user: {
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }
}
