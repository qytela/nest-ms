import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { GetUserLoginQuery } from '../impl/get-user-login.query';

import type { IAuthLogin } from 'shared/interfaces/Auth';

@QueryHandler(GetUserLoginQuery)
export class GetUserLoginHandler implements IQueryHandler<GetUserLoginQuery> {
  async execute(query: GetUserLoginQuery): Promise<IAuthLogin> {
    const { userId } = query;

    Logger.log('[GetUserLoginQuery] called from [GetUserLoginHandler] with data:', userId);

    return {
      userId: userId,
      token: 'xxxxxxxxxxxx',
      roles: ['user'],
    };
  }
}
