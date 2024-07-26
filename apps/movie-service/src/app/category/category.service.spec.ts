import { Test, TestingModule } from '@nestjs/testing';
import { ClientKafka } from '@nestjs/microservices';
import { createMock } from '@golevelup/ts-jest';

import { CategoryService } from './category.service';

import type { IAuthMe } from 'shared/interfaces/Auth';
import type { IMovieCategory, ICategory } from 'shared/interfaces/Movie';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: 'AUTH_SERVICE',
          useValue: createMock<ClientKafka>(),
        },
        {
          provide: 'LOG_SERVICE',
          useValue: createMock<ClientKafka>(),
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  describe('findAll', () => {
    it('should return a movies', async () => {
      const mockUser = <IAuthMe>{
        userId: 1,
        name: 'qytela',
        roles: ['user'],
      };
      const result = await service.findAll();

      expect(result).toEqual(
        expect.objectContaining<IMovieCategory>({
          user: expect.objectContaining<IAuthMe>({
            userId: expect.any(Number),
            name: expect.any(String),
            roles: expect.any(Array),
          }),
          categories: expect.arrayContaining([
            expect.objectContaining<ICategory>({
              id: expect.any(Number),
              category: expect.any(String),
              slug: expect.any(String),
            }),
          ]),
        })
      );
    });
  });
});
