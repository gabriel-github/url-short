import { Injectable } from '@nestjs/common';
import { UrlsRepository } from 'src/application/repositories/urls.repository';

@Injectable()
export class FetchUrls {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute(userId: string) {
    const urls = await this.urlsRepository.fetchUrls(userId);

    return {
      urls,
    };
  }
}
