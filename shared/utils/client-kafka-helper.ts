import { InternalServerErrorException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import type { IPromService } from 'apps/api-gateway/src/interfaces/prom.service.interface';
import type { IClientKafkaError } from '../interfaces/Kafka';

interface IOptions {
  client: ClientKafka;
  timeout?: number;
}

export class ClientKafkaHelper {
  private client: ClientKafka;
  private timeout: number;

  constructor(options: IOptions) {
    this.client = options.client;
    this.timeout = options.timeout ?? 30000;
  }

  async sendMessage<T = any>(pattern: any, data?: any, timer?: IPromService): Promise<T> {
    try {
      return await firstValueFrom(
        this.client.send(pattern, data ?? JSON.stringify({})).pipe(timeout(this.timeout))
      );
    } catch (error) {
      if (timer) timer.fail();

      if (error instanceof Error) {
        throw new InternalServerErrorException(<IClientKafkaError>{
          status: false,
          message: 'Error',
          pattern: pattern,
          exception: error.message,
        });
      }

      return error;
    }
  }
}
