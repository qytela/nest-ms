import { CommandHandler, EventBus, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UserRegisterCommand } from '../impl/user-register.command';
import { UserRegisterEvent } from '../../events/impl/user-register.event';
import { GetUserRegisterQuery } from '../../queries/impl/get-user-register.query';

import type { IAuthRegister } from 'shared/interfaces/Auth';

@CommandHandler(UserRegisterCommand)
export class UserRegisterHandler implements ICommandHandler<UserRegisterCommand> {
  constructor(private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async execute(command: UserRegisterCommand): Promise<IAuthRegister> {
    Logger.log('[UserRegisterCommand] called from [UserRegisterHandler] with data:');
    Logger.log(JSON.stringify(command));

    const userId = 1;
    this.eventBus.publish(new UserRegisterEvent(userId));

    return this.queryBus.execute(new GetUserRegisterQuery(userId));
  }
}
