import { User as PrismaUser, Prisma } from '@prisma/client';
import { User } from 'src/application/entities/user';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return new User(
      {
        email: raw.email,
        password: raw.password,
      },
      raw.id,
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      email: user.email,
      password: user.password,
    };
  }
}
