import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ClientKafkaHelper } from 'shared/utils/client-kafka-helper';
import { PromService } from '../prom/prom.service';

import type { IAuthLogin, IAuthRegister, IAuthMe } from 'shared/interfaces/Auth';

@Injectable()
export class AuthService implements OnModuleInit {
  private client: ClientKafkaHelper;

  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    private readonly promService: PromService
  ) {
    this.client = new ClientKafkaHelper({ client: this.authClient });
  }

  async login({ username, password }, req: Request) {
    const timer = this.promService.startHttpTimer(req, { operation: 'auth.service-login' });

    const user = await this.client.sendMessage<IAuthLogin>(
      'auth.login',
      JSON.stringify({ username, password }),
      timer
    );
    if (user?.userId) {
      timer.success();
      return user;
    }

    throw new UnauthorizedException();
  }

  async register({ name, username, password }, req: Request) {
    const timer = this.promService.startHttpTimer(req, { operation: 'auth.service-register' });

    const user = await this.client.sendMessage<IAuthRegister>(
      'auth.register',
      JSON.stringify({ name, username, password }),
      timer
    );
    if (user?.name) {
      timer.success();
      return user;
    }

    throw new UnprocessableEntityException();
  }

  async me(req: Request): Promise<IAuthMe> {
    const timer = this.promService.startHttpTimer(req, { operation: 'auth.service-me' });

    const user = await this.client.sendMessage<IAuthMe>('auth.me', undefined, timer);
    if (user?.userId) {
      timer.success();
      return user;
    }

    throw new UnauthorizedException();
  }

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('auth.login');
    this.authClient.subscribeToResponseOf('auth.register');
    this.authClient.subscribeToResponseOf('auth.me');
    await this.authClient.connect();
  }
}
