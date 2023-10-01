import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, passport: string) {
    try {
      return this.usersService.verifyUser(email, passport);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
