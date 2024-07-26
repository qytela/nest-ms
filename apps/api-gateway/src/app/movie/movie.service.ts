import { Inject, Injectable, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ClientKafkaHelper } from 'shared/utils/client-kafka-helper';
import { PromService } from '../prom/prom.service';

import type { IMovie } from 'shared/interfaces/Movie';

@Injectable()
export class MovieService implements OnModuleInit {
  private client: ClientKafkaHelper;

  constructor(
    @Inject('MOVIE_SERVICE') private readonly movieClient: ClientKafka,
    private readonly promService: PromService
  ) {
    this.client = new ClientKafkaHelper({ client: this.movieClient });
  }

  async findAll(req: Request): Promise<IMovie[]> {
    const timer = this.promService.startHttpTimer(req, { operation: 'movie.service-findAll' });

    const movies = await this.client.sendMessage<IMovie[]>('movie.findAll', undefined, timer);
    if (movies && Array.isArray(movies)) {
      timer.success();
      return movies;
    }

    throw new UnprocessableEntityException();
  }

  async onModuleInit() {
    this.movieClient.subscribeToResponseOf('movie.findAll');
    await this.movieClient.connect();
  }
}
