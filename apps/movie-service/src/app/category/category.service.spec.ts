import { TestBed } from '@automock/jest';
import { ClientKafka } from '@nestjs/microservices';
import { of } from 'rxjs';
import { AuthMeMock } from 'shared/mocks/user-mock';

import { CategoryService } from './category.service';

import type { IAuthMe } from 'shared/interfaces/Auth';
import type { IMovieCategory, ICategory } from 'shared/interfaces/Movie';

describe('CategoryService', () => {
  let service: CategoryService;
  let authClient: jest.Mocked<ClientKafka>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(CategoryService).compile();

    service = unit;
    authClient = unitRef.get<ClientKafka>('AUTH_SERVICE');
  });

  describe('findAll', () => {
    it('should return a categories', async () => {
      authClient.send.mockReturnValue(of(AuthMeMock));
      const result = await service.findAll();

      expect(authClient.send).toHaveBeenCalled();
      expect(authClient.send).toHaveBeenCalledWith('auth.me', '{}');
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
