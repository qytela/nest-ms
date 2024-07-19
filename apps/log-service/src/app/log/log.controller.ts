import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { LogService } from './log.service';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @EventPattern('log_save')
  save(@Payload() payload) {
    return this.logService.save(payload);
  }
}
