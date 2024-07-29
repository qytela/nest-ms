import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserRegisterCommand } from './commands/impl/user-register.command';
import { GetUserLoginQuery } from './queries/impl/get-user-login.query';

import type { IAuthLogin, IAuthRegister, IAuthMe } from 'shared/interfaces/Auth';

@Injectable()
export class AuthService {
  constructor(private readonly cmdBus: CommandBus, private readonly queryBus: QueryBus) {}

  async login(message: { username: string; password: string }): Promise<IAuthLogin> {
    if (message.username === 'qytela' && message.password === '123123') {
      return this.queryBus.execute<GetUserLoginQuery, IAuthLogin>(new GetUserLoginQuery(1));
    }

    throw new UnauthorizedException();
  }

  async register(message: {
    name: string;
    username: string;
    password: string;
  }): Promise<IAuthRegister> {
    return this.cmdBus.execute<UserRegisterCommand, IAuthRegister>(
      new UserRegisterCommand(message)
    );
  }

  me(): IAuthMe {
    return {
      userId: 1,
      name: 'Fansa',
      roles: ['user'],
    };
  }
}
