import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import type { IAuthLogin } from 'shared/interfaces/Auth';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka
  ) {}

  async login() {
    return await this.getUser();
  }

  private getUser(): Promise<IAuthLogin> {
    return new Promise((resolve) => {
      this.authClient
        .send(
          'auth_login',
          JSON.stringify({ username: 'qytela', password: '123123' })
        )
        .subscribe((user: IAuthLogin) => resolve(user));
    });
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('auth_login');
  }
}
