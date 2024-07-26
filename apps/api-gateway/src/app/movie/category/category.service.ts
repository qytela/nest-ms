import { Inject, Injectable, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ClientKafkaHelper } from 'shared/utils/client-kafka-helper';
import { PromService } from '../../prom/prom.service';

import type { IMovieCategory } from 'shared/interfaces/Movie';

@Injectable()
export class CategoryService implements OnModuleInit {
  private client: ClientKafkaHelper;

  constructor(
    @Inject('MOVIE_SERVICE') private readonly movieClient: ClientKafka,
    private readonly promService: PromService
  ) {
    this.client = new ClientKafkaHelper({ client: this.movieClient });
  }

  async findAll(req: Request): Promise<IMovieCategory> {
    const timer = this.promService.startHttpTimer(req, { operation: 'category.service-findAll' });

    const categories = await this.client.sendMessage<IMovieCategory>(
      'movie.category.findAll',
      undefined,
      timer
    );
    if (categories?.categories) {
      timer.success();
      return categories;
    }

    throw new UnprocessableEntityException();
  }

  async onModuleInit() {
    this.movieClient.subscribeToResponseOf('movie.category.findAll');
    await this.movieClient.connect();
  }
}
