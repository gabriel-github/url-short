import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { LoginUser } from 'src/application/use-cases/authenticate/login.user';
import { AuthenticateUserBody } from './dtos/authenticate.user.body';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth controller')
@Controller('auth')
export class AuthController {
  constructor(private loginUser: LoginUser) {}

  @ApiOperation({
    summary: 'authenticate user',
  })
  @HttpCode(200)
  @Post('/login')
  async login(@Body() body: AuthenticateUserBody) {
    const { email, password } = body;

    const response = await this.loginUser.execute({
      email,
      password,
    });

    if (response.isLeft()) {
      const error = response.value;
      throw new BadRequestException(error.message);
    }

    const { accessToken } = response.value;

    return {
      access_token: accessToken,
    };
  }
}
