import { InMemoryUrlsRepository } from 'test/in-memory/in.memory.urls.repository';
import { UpdateUrl } from './update.url';
import { Url } from 'src/application/entities/url';
import { User } from 'src/application/entities/user';
import { InMemoryUsersRepository } from 'test/in-memory/in.memory.users.repository';

describe('Update url usecase', () => {
  it('should be able update a url', async () => {
    const urlsRepository = new InMemoryUrlsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const usecase = new UpdateUrl(urlsRepository);

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

    await urlsRepository.create(url);

    expect(urlsRepository.urls[0].originalUrl).toEqual(
      'https://www.google.com/',
    );

    await usecase.execute({
      newDestinyUrl: 'https://www.youtube.com/',
      urlId: url.id,
    });

    expect(urlsRepository.urls[0].originalUrl).toEqual(
      'https://www.youtube.com/',
    );
  });
});
