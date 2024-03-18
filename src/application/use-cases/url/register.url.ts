import { BadRequestException, Injectable } from '@nestjs/common';
import ShortUniqueId from 'short-unique-id';
import { Url } from 'src/application/entities/url';
import { UrlsRepository } from 'src/application/repositories/urls.repository';

interface RegisterUrlRequest {
  originalUrl: string;
  userId: string;
}

@Injectable()
export class RegisterUrl {
  constructor(private urlRepository: UrlsRepository) {}

  private generateShortUrl(urlStandart: string, hash: string): string {
    return `${urlStandart}/${hash}`;
  }

  async execute({ originalUrl, userId }: RegisterUrlRequest) {
    if (!this.isValidUrl(originalUrl)) {
      throw new BadRequestException(
        'O link deve começar com "https://" ou "http://".',
      );
    }

    const uid = new ShortUniqueId({ length: 16 });

    const hash = uid.rnd().substring(0, 6);

    const shortenedUrl = this.generateShortUrl(process.env.URL_BASE, hash);

    const url = new Url({
      originalUrl,
      hash,
      userId: userId ?? null,
    });

    await this.urlRepository.create(url);

    return {
      original_url: originalUrl,
      shortened_url: shortenedUrl,
    };
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
