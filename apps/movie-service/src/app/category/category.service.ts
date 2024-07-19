import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import type { IAuthMe } from 'shared/interfaces/Auth';

@Injectable()
export class CategoryService implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('LOG_SERVICE') private readonly logClient: ClientKafka
  ) {}

  async findAll() {
    this.logClient.emit(
      'log_save',
      JSON.stringify({
        fromService: 'category-service',
        service: 'findAll',
        timestamps: new Date(),
      })
    );

    const user = await this.getUser();

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

  private getUser() {
    return new Promise((resolve) => {
      this.authClient
        .send('auth_me', JSON.stringify({}))
        .subscribe((user: IAuthMe) => resolve(user));
    });
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('auth_me');
  }
}
