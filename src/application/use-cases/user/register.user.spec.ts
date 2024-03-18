import { User } from 'src/application/entities/user';
import { InMemoryUsersRepository } from 'test/in-memory/in.memory.users.repository';
import { RegisterUser } from './register.user';
import { UseCaseError } from 'src/application/errors/use.cases.error';

describe('Register user usecase', () => {
  it('should be able to register a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const usecase = new RegisterUser(usersRepository);

    await usecase.execute({
      email: 'test@gmail.com',
      password: '123',
    });

    expect(usersRepository.users[0].id).toBeDefined();
    expect(usersRepository.users[0].password).toBeTruthy();
    expect(usersRepository.users[0].email).toEqual('test@gmail.com');
  });

  it('should not be able to register a user with same email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const usecase = new RegisterUser(usersRepository);

    const user = new User({
      email: 'test@gmail.com',
      password: '123456',
    });

    await usersRepository.create(user);

    const response = await usecase.execute({
      email: 'test@gmail.com',
      password: '123',
    });

    expect(response.value).toBeInstanceOf(UseCaseError);
  });
});
