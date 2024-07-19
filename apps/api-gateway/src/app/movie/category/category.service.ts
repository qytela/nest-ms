import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import type { IMovieCategory } from 'shared/interfaces/Movie';

@Injectable()
export class CategoryService implements OnModuleInit {
  constructor(
    @Inject('MOVIE_SERVICE') private readonly movieClient: ClientKafka
  ) {}

  async findAll() {
    return await this.getCategories();
  }

  private getCategories(): Promise<IMovieCategory> {
    return new Promise((resolve) => {
      this.movieClient
        .send('category_findAll', JSON.stringify({}))
        .subscribe((data: IMovieCategory) => resolve(data));
    });
  }

  onModuleInit() {
    this.movieClient.subscribeToResponseOf('category_findAll');
  }
}
