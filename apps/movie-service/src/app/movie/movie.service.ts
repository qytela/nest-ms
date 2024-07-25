import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import type { IMovie } from 'shared/interfaces/Movie';

@Injectable()
export class MovieService {
  constructor(@Inject('LOG_SERVICE') private readonly logClient: ClientKafka) {}

  async findAll(): Promise<IMovie[]> {
    this.logClient.emit(
      'log.save',
      JSON.stringify({
        fromService: 'movie.service',
        service: 'findAll',
        timestamps: new Date(),
      })
    );

    return [
      {
        id: 1,
        title: 'Titanic',
        author: 'James Bone',
        duration: 4680,
      },
      {
        id: 2,
        title: 'Fast & Furious',
        author: 'James Bone',
        duration: 4680,
      },
      {
        id: 3,
        title: 'Boku no Pico',
        author: 'James Bone',
        duration: 18000,
      },
    ];
  }
}
