import { Url as PrismaUrl, Prisma } from '@prisma/client';
import { Url } from 'src/application/entities/url';

export class PrismaUrlMapper {
  static toDomain(raw: PrismaUrl): Url {
    return new Url(
      {
        originalUrl: raw.original_url,
        hash: raw.hash,
        userId: raw.userId,
        visits: raw.visits,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      raw.id,
    );
  }

  static toPrisma(url: Url): Prisma.UrlUncheckedCreateInput {
    return {
      id: url.id.toString(),
      original_url: url.originalUrl.toString(),
      hash: url.hash.toString(),
      userId: url.userId ? url.userId.toString() : null,
    };
  }
}
