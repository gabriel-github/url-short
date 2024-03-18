import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Either, left, right } from 'src/application/errors/either';
import { UseCaseError } from 'src/application/errors/use.cases.error';
import { UsersRepository } from 'src/application/repositories/users.repository';
import { jwtSecret } from './../../../common/constants';

interface LoginRequest {
  email: string;
  password: string;
}

type LoginUserResponse = Either<
  UseCaseError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class LoginUser {
  constructor(
    private usersRepository: UsersRepository,
    private jwt: JwtService,
  ) {}

  async execute(request: LoginRequest): Promise<LoginUserResponse> {
    const { email, password } = request;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new UseCaseError('Usuário ou senha inválida!', 400));
    }

    const passwordMatch = await this.comparePasswords({
      password,
      hashedPassword: user.password,
    });

    if (!passwordMatch) {
      return left(new UseCaseError('Usuário ou senha inválida!', 400));
    }

    const token = await this.signToken({
      id: user.id,
      email: user.email,
    });

    return right({ accessToken: token });
  }

  async comparePasswords(credentials: {
    password: string;
    hashedPassword: string;
  }): Promise<boolean> {
    const { password, hashedPassword } = credentials;

    return await bcrypt.compare(password, hashedPassword);
  }

  async signToken(args: { id: string; email: string }) {
    const payload = args;

    return this.jwt.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: '12h',
    });
  }
}
