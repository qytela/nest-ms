import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ClientKafkaHelper } from 'shared/utils/client-kafka-helper';

import type { IAuthMe } from 'shared/interfaces/Auth';
import type { IMovieCategory } from 'shared/interfaces/Movie';

@Injectable()
export class CategoryService implements OnModuleInit {
  private client: ClientKafkaHelper;

  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('LOG_SERVICE') private readonly logClient: ClientKafka
  ) {
    this.client = new ClientKafkaHelper({ client: this.authClient });
  }

  async findAll(): Promise<IMovieCategory> {
    this.logClient.emit(
      'log.save',
      JSON.stringify({
        fromService: 'category.service',
        service: 'findAll',
        timestamps: new Date(),
      })
    );

    const user = await this.client.sendMessage<IAuthMe>('auth.me');

    return {
      user: user,
      categories: [
        {
          id: 1,
          category: 'Horror',
          slug: 'horror',
        },
        {
          id: 2,
          category: 'Adventure',
          slug: 'adventure',
        },
        {
          id: 3,
          category: 'Romance and Action',
          slug: 'romance-and-action',
        },
      ],
    };
  }

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('auth.me');
    await this.authClient.connect();
  }
}
