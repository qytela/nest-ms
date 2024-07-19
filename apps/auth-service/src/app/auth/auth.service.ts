import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return {
      userId: 1,
      token: 'xxxxxxxxxxxx',
      roles: ['user'],
    };
  }

  me() {
    return {
      userId: 1,
      name: 'Fansa',
      roles: ['user'],
    };
  }
}
