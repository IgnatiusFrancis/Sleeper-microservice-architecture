import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '../interfaces/token.payload.interface';
import { UserDocument } from '../users/models/user.schema';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) =>
          request?.cookies?.Authentication || request?.Authentication,
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload): Promise<UserDocument> {
    return this.usersService.getUser({ _id: userId });
  }
}
