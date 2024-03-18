import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlsRepository } from 'src/application/repositories/urls.repository';

interface DeleteUrlRequest {
  urlId: string;
}

@Injectable()
export class DeleteUrl {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute({ urlId }: DeleteUrlRequest) {
    const url = await this.urlsRepository.findUrlByUrlId(urlId);

    if (!url) {
      throw new NotFoundException('URL not exists');
    }

    await this.urlsRepository.delete(urlId);
  }
}
