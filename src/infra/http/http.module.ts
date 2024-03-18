import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './controllers/auth/auth.controller';
import { LoginUser } from 'src/application/use-cases/authenticate/login.user';
import { JwtService } from '@nestjs/jwt';
import { RegisterUser } from 'src/application/use-cases/user/register.user';
import { UsersController } from './controllers/users/users.controller';
import { UrlsController } from './controllers/urls/urls.controller';
import { RegisterUrl } from 'src/application/use-cases/url/register.url';
import { UpdateUrl } from 'src/application/use-cases/url/update.url';
import { DeleteUrl } from 'src/application/use-cases/url/delete.url';
import { FetchUrls } from 'src/application/use-cases/url/fetch.urls';
import { AccessUrl } from 'src/application/use-cases/url/access.url';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController, UsersController, UrlsController],
  providers: [
    LoginUser,
    JwtService,
    RegisterUser,
    RegisterUrl,
    UpdateUrl,
    DeleteUrl,
    FetchUrls,
    AccessUrl,
  ],
})
export class HttpModule {}
