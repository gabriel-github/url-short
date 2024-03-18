import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/application/errors/either';
import { UseCaseError } from 'src/application/errors/use.cases.error';
import { UrlsRepository } from 'src/application/repositories/urls.repository';

interface AccessUrlRequest {
  accessUrl: string;
}

type AccessUrlResponse = Either<
  UseCaseError,
  {
    url: string;
  }
>;

@Injectable()
export class AccessUrl {
  constructor(private urlRepository: UrlsRepository) {}

  async execute({ accessUrl }: AccessUrlRequest): Promise<AccessUrlResponse> {
    const url = await this.urlRepository.accessUrl(accessUrl);

    if (!url) {
      return left(new UseCaseError('Url not found', 404));
    }

    return right({
      url,
    });
  }
}
