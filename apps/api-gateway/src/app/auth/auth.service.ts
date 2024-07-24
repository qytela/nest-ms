import { Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ClientKafkaHelper } from 'shared/utils/client-kafka-helper';
import { PromService } from '../prom.service';

import type { IAuthLogin } from 'shared/interfaces/Auth';

@Injectable()
export class AuthService implements OnModuleInit {
  private client: ClientKafkaHelper;

  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    private readonly promService: PromService
  ) {
    this.client = new ClientKafkaHelper({ client: this.authClient });
  }

  async login({ username, password }, req: Request): Promise<IAuthLogin> {
    const timer = this.promService.startHttpTimer(req, { operation: 'auth.service-login' });

    const user = await this.client.sendMessage<IAuthLogin>(
      'auth.login',
      JSON.stringify({ username, password }),
      timer
    );

    timer.success();

    if (user?.userId) return user;

    throw new UnauthorizedException();
  }

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('auth.login');
    await this.authClient.connect();
  }
}
