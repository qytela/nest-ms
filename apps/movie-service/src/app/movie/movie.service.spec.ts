import { Test, TestingModule } from '@nestjs/testing';
import { ClientKafka } from '@nestjs/microservices';
import { createMock } from '@golevelup/ts-jest';

import { MovieService } from './movie.service';

import type { IMovie } from 'shared/interfaces/Movie';

describe('MovieService', () => {
  let service: MovieService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: 'LOG_SERVICE',
          useValue: createMock<ClientKafka>(),
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  describe('findAll', () => {
    it('should return a movies', async () => {
      const result = await service.findAll();

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining<IMovie>({
            id: expect.any(Number),
            title: expect.any(String),
            author: expect.any(String),
            duration: expect.any(Number),
          }),
        ])
      );
    });
  });
});
