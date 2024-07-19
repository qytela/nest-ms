import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LogService {
  save(message: { fromService: string; service: string; timestamps: Date }) {
    Logger.log('Activity saved', message);
  }
}
