import { InMemoryUsersRepository } from 'test/in-memory/in.memory.users.repository';
import { LoginUser } from './login.user';
import { RegisterUser } from '../user/register.user';
import { UseCaseError } from 'src/application/errors/use.cases.error';

describe('Login user usecase', () => {
  const mock = jest.fn().mockImplementation(() => {
    return {
      signAsync: jest.fn().mockReturnValue('skdjsjdksdjk'),
    };
  });

  it('should be ble login with correct credentials', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUser = new RegisterUser(usersRepository);
    const jwt = mock();
    const usecase = new LoginUser(usersRepository, jwt);

    await registerUser.execute({
      email: 'test@gmail.com',
      password: '123456',
    });

    const response = await usecase.execute({
      email: 'test@gmail.com',
      password: '123456',
    });

    expect(response.value).not.toBeInstanceOf(UseCaseError);
  });

  it('should not be ble login with incorrect email credential', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUser = new RegisterUser(usersRepository);
    const jwt = mock();
    const usecase = new LoginUser(usersRepository, jwt);

    await registerUser.execute({
      email: 'test@gmail.com',
      password: '123456',
    });

    const response = await usecase.execute({
      email: 'test@gmail.error.com',
      password: '123456',
    });

    expect(response.value).toBeInstanceOf(UseCaseError);
  });

  it('should not be ble login with incorrect password credential', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUser = new RegisterUser(usersRepository);
    const jwt = mock();
    const usecase = new LoginUser(usersRepository, jwt);

    await registerUser.execute({
      email: 'test@gmail.com',
      password: '123456',
    });

    const response = await usecase.execute({
      email: 'test@gmail.com',
      password: '123456777',
    });

    expect(response.value).toBeInstanceOf(UseCaseError);
  });
});
