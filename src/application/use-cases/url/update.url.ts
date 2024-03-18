import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  UpdateUrlInput,
  UrlsRepository,
} from 'src/application/repositories/urls.repository';

@Injectable()
export class UpdateUrl {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute({ urlId, newDestinyUrl }: UpdateUrlInput) {
    if (!this.isValidUrl(newDestinyUrl)) {
      throw new BadRequestException(
        'O link deve começar com "https://" ou "http://".',
      );
    }

    const url = await this.urlsRepository.findUrlByUrlId(urlId);

    if (!url) {
      throw new NotFoundException('URL not exists!');
    }

    await this.urlsRepository.update({
      urlId,
      newDestinyUrl,
    });
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
}
