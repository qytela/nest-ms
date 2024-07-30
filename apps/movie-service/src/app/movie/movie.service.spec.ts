import { TestBed } from '@automock/jest';

import { MovieService } from './movie.service';

import type { IMovie } from 'shared/interfaces/Movie';

describe('MovieService', () => {
  let service: MovieService;

  beforeAll(async () => {
    const { unit } = TestBed.create(MovieService).compile();

    service = unit;
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
