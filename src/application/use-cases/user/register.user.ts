import { Injectable } from '@nestjs/common';
import { User } from 'src/application/entities/user';
import { Either, left, right } from 'src/application/errors/either';
import { UseCaseError } from 'src/application/errors/use.cases.error';
import { UsersRepository } from 'src/application/repositories/users.repository';
import { hashPassword } from 'src/utils/hash.password';

interface RegisterUserRequest {
  email: string;
  password: string;
}

type RegisterUserResponse = Either<
  UseCaseError,
  {
    user: User;
  }
>;

@Injectable()
export class RegisterUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    const { email, password } = request;

    const userAlreadyExist = await this.usersRepository.findByEmail(email);

    if (userAlreadyExist) {
      return left(new UseCaseError(`User ${email} already exists.`, 400));
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await this.usersRepository.create(user);

    return right({
      user,
    });
  }
}
