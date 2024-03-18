import { Url } from 'src/application/entities/url';
import {
  UpdateUrlInput,
  UrlsRepository,
} from 'src/application/repositories/urls.repository';

export class InMemoryUrlsRepository extends UrlsRepository {
  public urls: Url[] = [];

  async findUrlByUrlId(urlId: string): Promise<Url> {
    const urlFound = this.urls.find((url) => url.id === urlId);

    if (!urlFound) {
      return null;
    }

    return urlFound;
  }

  async create(url: Url): Promise<void> {
    this.urls.push(url);

    return;
  }

  async delete(urlId: string): Promise<void> {
    const urlIndex = this.urls.findIndex((url) => url.id === urlId);

    this.urls[urlIndex].deletedAt = new Date();
  }

  async update(updateUrl: UpdateUrlInput): Promise<void> {
    const urlIndex = this.urls.findIndex((url) => url.id === updateUrl.urlId);

    this.urls[urlIndex].originalUrl = updateUrl.newDestinyUrl;
  }

  async fetchUrls(userId: string): Promise<Url[]> {
    return this.urls.filter((url) => url.userId === userId);
  }

  async accessUrl(hash: string): Promise<string> {
    const urlFound = this.urls.find(
      (url) => url.hash === hash && url.deletedAt === null,
    );

    if (!urlFound) {
      return null;
    }

    urlFound.visits += 1;

    return urlFound.originalUrl;
  }
}
