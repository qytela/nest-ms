import { Injectable, UnauthorizedException } from '@nestjs/common';

import type { IAuthLogin, IAuthMe } from 'shared/interfaces/Auth';

@Injectable()
export class AuthService {
  login(message: { username: string; password: string }): IAuthLogin {
    if (message.username === 'qytela' && message.password === '123123') {
      return {
        userId: 1,
        token: 'xxxxxxxxxxxx',
        roles: ['user'],
      };
    }

    throw new UnauthorizedException();
  }

  me(): IAuthMe {
    return {
      userId: 1,
      name: 'Fansa',
      roles: ['user'],
    };
  }
}
