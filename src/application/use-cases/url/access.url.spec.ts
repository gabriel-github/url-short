import { InMemoryUrlsRepository } from 'test/in-memory/in.memory.urls.repository';
import { InMemoryUsersRepository } from 'test/in-memory/in.memory.users.repository';
import { AccessUrl } from './access.url';
import { User } from 'src/application/entities/user';
import { Url } from 'src/application/entities/url';
import { UseCaseError } from 'src/application/errors/use.cases.error';

describe('Access URL usecase', () => {
  it('should ble able to access a url', async () => {
    const urlsRepository = new InMemoryUrlsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const usecase = new AccessUrl(urlsRepository);

    const user = new User({
      email: 'test@gmail.com',
      password: '123456',
    });

    await usersRepository.create(user);

    const newUrl = new Url({
      originalUrl: 'https://www.google.com/',
      hash: 'lsuNML',
      userId: user.id,
    });

    await urlsRepository.create(newUrl);

    const response = await usecase.execute({
      accessUrl: newUrl.hash,
    });

    expect(response.value).not.toBeInstanceOf(UseCaseError);
  });

  it('should be able to count amount access', async () => {
    const urlsRepository = new InMemoryUrlsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const usecase = new AccessUrl(urlsRepository);

    const user = new User({
      email: 'test@gmail.com',
      password: '123456',
    });

    await usersRepository.create(user);

    const newUrl = new Url({
      originalUrl: 'https://www.google.com/',
      hash: 'lsuNML',
      userId: user.id,
    });

    await urlsRepository.create(newUrl);

    await usecase.execute({
      accessUrl: newUrl.hash,
    });

    expect(urlsRepository.urls[0].visits).toBe(1);
  });

  it('should not be able to access a url non extistent', async () => {
    const urlsRepository = new InMemoryUrlsRepository();
    const usecase = new AccessUrl(urlsRepository);

    const response = await usecase.execute({
      accessUrl: 'nnkaskalks',
    });

    expect(response.value).toBeInstanceOf(UseCaseError);
  });
});
