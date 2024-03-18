import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { RegisterUrl } from 'src/application/use-cases/url/register.url';
import { RegisterUrlBody } from './dtos/register.url.body';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { CurrentUser } from 'src/infra/auth/user.decorator';
import { JwtUserAuthGuard } from 'src/infra/auth/jwt.guard';
import { UpdateUrl } from 'src/application/use-cases/url/update.url';
import { UpdateUrlBody } from './dtos/update.url.body';
import { DeleteUrl } from 'src/application/use-cases/url/delete.url';
import { FetchUrls } from 'src/application/use-cases/url/fetch.urls';
import { AccessUrl } from 'src/application/use-cases/url/access.url';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('URLs controller')
@Controller('urls')
export class UrlsController {
  constructor(
    private registerUrl: RegisterUrl,
    private updateUrl: UpdateUrl,
    private deleteUrl: DeleteUrl,
    private fetchUrls: FetchUrls,
    private accessUrl: AccessUrl,
  ) {}

  @ApiOperation({
    summary: 'register a url shorten',
  })
  @HttpCode(201)
  @Post('/')
  async register(
    @Body() body: RegisterUrlBody,
    @CurrentUser() currentUser: UserPayload,
  ) {
    const { originalUrl } = body;

    const { original_url, shortened_url } = await this.registerUrl.execute({
      originalUrl,
      userId: currentUser ? currentUser.id : null,
    });

    return {
      original_url,
      shortened_url,
    };
  }

  @ApiOperation({
    summary: 'list urls',
  })
  @HttpCode(200)
  @Get('/')
  @UseGuards(JwtUserAuthGuard)
  async fetch(@CurrentUser() currentUser: UserPayload) {
    const { urls } = await this.fetchUrls.execute(currentUser.id);

    return urls.map((url) => {
      return {
        id: url.id,
        visits: url.visits,
        originalUrl: url.originalUrl,
        shortUrl: `${process.env.URL_BASE}:${process.env.PORT}/${url.hash}`,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt,
        deletedAt: url.deletedAt,
      };
    });
  }

  @ApiOperation({
    summary: 'update a existent url',
  })
  @HttpCode(204)
  @Put('/')
  @UseGuards(JwtUserAuthGuard)
  async update(@Body() body: UpdateUrlBody) {
    const { urlId, newDestinyUrl } = body;

    await this.updateUrl.execute({
      urlId,
      newDestinyUrl,
    });
  }

  @ApiOperation({
    summary: 'delete a url',
  })
  @HttpCode(204)
  @Delete('/:id')
  @UseGuards(JwtUserAuthGuard)
  async delete(@Param('id') id: string) {
    await this.deleteUrl.execute({
      urlId: id,
    });
  }

  @ApiOperation({
    summary: 'access a url by short hash',
  })
  @HttpCode(200)
  @Get('/access/:hash')
  @Redirect('', 301)
  @HttpCode(200)
  async access(@Param('hash') hash: string) {
    const result = await this.accessUrl.execute({
      accessUrl: hash,
    });

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message);
    }

    return {
      url: result.value.url,
    };
  }
}
