import { Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ClientKafkaHelper } from 'shared/utils/client-kafka-helper';

import type { IAuthLogin } from 'shared/interfaces/Auth';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientKafka) {}

  async login({ username, password }) {
    const client = new ClientKafkaHelper({ client: this.authClient });
    const user = await client.sendMessage<IAuthLogin>(
      'auth.login',
      JSON.stringify({ username, password })
    );

    if ((user as IAuthLogin)?.userId) return user;

    throw new UnauthorizedException();
  }

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('auth.login');
    await this.authClient.connect();
  }
}
