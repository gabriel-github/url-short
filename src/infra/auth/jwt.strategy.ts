import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { jwtSecret } from 'src/common/constants';

export interface UserPayload {
  id: string;
  email: string;
}

@Injectable()
export class JwtStrategyUser extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategyUser.extractJWT]),

      secretOrKey: jwtSecret,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.headers.authorization) {
      const [, token] = req.headers.authorization.split(' ');
      return token;
    }

    throw new UnauthorizedException();
  }

  async validate(payload: UserPayload) {
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
