import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  UpdateUrlInput,
  UrlsRepository,
} from 'src/application/repositories/urls.repository';
import { Url } from 'src/application/entities/url';
import { PrismaUrlMapper } from '../mappers/url.mapper';

@Injectable()
export class PrismaUrlsRepository implements UrlsRepository {
  constructor(private prisma: PrismaService) {}

  async findUrlByUrlId(urlId: string): Promise<Url> {
    const raw = await this.prisma.url.findUnique({
      where: {
        id: urlId,
      },
    });

    return PrismaUrlMapper.toDomain(raw);
  }

  async create(url: Url): Promise<void> {
    if (url.userId) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: url.userId,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found!');
      }

      const data = PrismaUrlMapper.toPrisma(url);

      await this.prisma.url.create({
        data,
      });

      return;
    }

    const data = PrismaUrlMapper.toPrisma(url);

    await this.prisma.url.create({
      data,
    });

    return;
  }

  async delete(urlId: string): Promise<void> {
    await this.prisma.url.update({
      where: {
        id: urlId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async update(updateUrl: UpdateUrlInput): Promise<void> {
    const url = await this.prisma.url.findFirst({
      where: {
        id: updateUrl.urlId,
        deletedAt: {
          equals: null,
        },
      },
    });

    if (!url) {
      throw new NotFoundException('URl not exists');
    }

    await this.prisma.url.update({
      where: {
        id: updateUrl.urlId,
      },
      data: {
        original_url: updateUrl.newDestinyUrl,
      },
    });
  }

  async fetchUrls(userId: string): Promise<Url[]> {
    const raw = await this.prisma.url.findMany({
      where: {
        userId,
        deletedAt: {
          equals: null,
        },
      },
    });

    return raw.map((rawItem) => {
      return PrismaUrlMapper.toDomain(rawItem);
    });
  }

  async accessUrl(hash: string): Promise<string> {
    const urlAlreadyExists = await this.prisma.url.findFirst({
      where: {
        hash,
        deletedAt: {
          equals: null,
        },
      },
    });

    if (!urlAlreadyExists) throw new NotFoundException('URL not found.');

    await this.prisma.url.update({
      where: {
        id: urlAlreadyExists.id,
      },
      data: {
        visits: urlAlreadyExists.visits + 1,
      },
    });

    return urlAlreadyExists.original_url;
  }
}
