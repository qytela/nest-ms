import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ClientKafkaHelper } from 'shared/utils/client-kafka-helper';

import type { IMovieCategory } from 'shared/interfaces/Movie';

@Injectable()
export class CategoryService implements OnModuleInit {
  constructor(
    @Inject('MOVIE_SERVICE') private readonly movieClient: ClientKafka,
    private client: ClientKafkaHelper
  ) {
    this.client = new ClientKafkaHelper({ client: this.movieClient });
  }

  async findAll() {
    return await this.client.sendMessage<IMovieCategory>('movie.category.findAll');
  }

  async onModuleInit() {
    this.movieClient.subscribeToResponseOf('movie.category.findAll');
    await this.movieClient.connect();
  }
}
