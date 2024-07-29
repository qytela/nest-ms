import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { GetUserRegisterQuery } from '../impl/get-user-register.query';

import type { IAuthRegister } from 'shared/interfaces/Auth';

@QueryHandler(GetUserRegisterQuery)
export class GetUserRegisterHandler implements IQueryHandler<GetUserRegisterQuery> {
  async execute(query: GetUserRegisterQuery): Promise<IAuthRegister> {
    const { userId } = query;

    Logger.log('[GetUserRegisterQuery] called from [GetUserRegisterHandler] with data:', userId);

    return {
      name: 'Fansa',
      username: 'fansa',
      password: '123123',
    };
  }
}
