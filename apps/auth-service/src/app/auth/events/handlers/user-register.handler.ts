import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UserRegisterEvent } from '../impl/user-register.event';

@EventsHandler(UserRegisterEvent)
export class UserRegisterHandler implements IEventHandler<UserRegisterEvent> {
  handle(event: UserRegisterEvent) {
    Logger.log('[UserRegisterEvent] called from [UserRegisterHandler] with data:', event.userId);
  }
}
