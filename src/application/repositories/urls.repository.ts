import { Url } from '../entities/url';

export interface UpdateUrlInput {
  urlId: string;
  newDestinyUrl: string;
}

export abstract class UrlsRepository {
  abstract findUrlByUrlId(urlId: string): Promise<Url>;
  abstract create(url: Url): Promise<void>;
  abstract delete(urlId: string): Promise<void>;
  abstract update(updateUrl: UpdateUrlInput): Promise<void>;
  abstract fetchUrls(userId: string): Promise<Url[]>;
  abstract accessUrl(hash: string): Promise<string>;
}
