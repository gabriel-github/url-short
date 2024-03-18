import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserPayload } from './jwt.strategy';

import * as jwt from 'jsonwebtoken';
import { jwtSecret } from 'src/common/constants';

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.headers.authorization) {
      const [, token] = request.headers.authorization.split(' ');

      if (token) {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded as UserPayload;
      }

      return;
    }

    return;
  },
);
