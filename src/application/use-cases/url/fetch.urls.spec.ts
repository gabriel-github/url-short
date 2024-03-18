import { InMemoryUrlsRepository } from 'test/in-memory/in.memory.urls.repository';
import { InMemoryUsersRepository } from 'test/in-memory/in.memory.users.repository';
import { FetchUrls } from './fetch.urls';
import { User } from 'src/application/entities/user';
import { Url } from 'src/application/entities/url';

describe('Fetch URLs usecase', () => {
  it('should be able to fetch urls created by user', async () => {
    const urlsRepository = new InMemoryUrlsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const usecase = new FetchUrls(urlsRepository);

    const user = new User({
      email: 'test@gmail.com',
      password: '123456',
    });

    await usersRepository.create(user);

    const url = new Url({
      originalUrl: 'https://www.google.com/',
      hash: 'lsuNML',
      userId: user.id,
    });

    const url2 = new Url({
      originalUrl: 'https://www.google.com/',
      hash: 'lsYNMF',
      userId: user.id,
    });

    await urlsRepository.create(url);
    await urlsRepository.create(url2);

    const { urls } = await usecase.execute(user.id);

    expect(urls).toHaveLength(2);
    expect(urls[0].hash).toEqual(url.hash);
    expect(urls[1].hash).toEqual(url2.hash);
  });
});
