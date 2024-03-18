import { InMemoryUrlsRepository } from 'test/in-memory/in.memory.urls.repository';
import { RegisterUrl } from './register.url';
import 'dotenv/config';

describe('Register shorten url usecase', () => {
  it('should be able to create a shorten url', async () => {
    const urlsRepository = new InMemoryUrlsRepository();
    const usecase = new RegisterUrl(urlsRepository);

    const { original_url, shortened_url } = await usecase.execute({
      originalUrl: 'https://www.google.com/',
      userId: null,
    });

    const baseUrl = process.env.URL_BASE;

    expect(original_url).toEqual('https://www.google.com/');
    expect(shortened_url).toMatch(new RegExp(`^${baseUrl}`));
  });
});
