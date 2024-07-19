import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(message: { username: string; password: string }) {
    if (message.username === 'qytela' && message.password === '123123') {
      return {
        userId: 1,
        token: 'xxxxxxxxxxxx',
        roles: ['user'],
      };
    }

    throw new UnauthorizedException();
  }

  me() {
    return {
      userId: 1,
      name: 'Fansa',
      roles: ['user'],
    };
  }
}
