import { User } from 'src/application/entities/user';
import { UsersRepository } from 'src/application/repositories/users.repository';

export class InMemoryUsersRepository extends UsersRepository {
  public users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
