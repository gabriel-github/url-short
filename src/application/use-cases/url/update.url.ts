import { Injectable, NotFoundException } from '@nestjs/common';
import {
  UpdateUrlInput,
  UrlsRepository,
} from 'src/application/repositories/urls.repository';

@Injectable()
export class UpdateUrl {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute({ urlId, newDestinyUrl }: UpdateUrlInput) {
    const url = await this.urlsRepository.findUrlByUrlId(urlId);

    if (!url) {
      throw new NotFoundException('URL not exists!');
    }

    await this.urlsRepository.update({
      urlId,
      newDestinyUrl,
    });
  }
}
