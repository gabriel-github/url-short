import { Url } from 'src/application/entities/url';
import { InMemoryUrlsRepository } from 'test/in-memory/in.memory.urls.repository';
import { InMemoryUsersRepository } from 'test/in-memory/in.memory.users.repository';
import { DeleteUrl } from './delete.url';
import { User } from 'src/application/entities/user';

describe('Delete URL usecase', () => {
  it('should be able delete a url', async () => {
    const urlsRepository = new InMemoryUrlsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const usecase = new DeleteUrl(urlsRepository);

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

    await usecase.execute({
      urlId: url.id,
    });

    expect(urlsRepository.urls).toHaveLength(1);
    expect(urlsRepository.urls[0].deletedAt).toStrictEqual(expect.any(Date));
  });

  it('should not be able delete a url that does not exists', async () => {
    const urlsRepository = new InMemoryUrlsRepository();
    const usecase = new DeleteUrl(urlsRepository);

    await expect(
      usecase.execute({
        urlId: 'ijisjlsk',
      }),
    ).rejects.toThrow();
  });
});
