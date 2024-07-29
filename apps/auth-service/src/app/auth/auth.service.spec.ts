import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { CqrsModule, CommandBus, QueryBus } from '@nestjs/cqrs';

import { AuthService } from './auth.service';
import { GetUserLoginQuery } from './queries/impl/get-user-login.query';

import type { IAuthLogin, IAuthMe } from 'shared/interfaces/Auth';

describe('AuthService', () => {
  let service: AuthService;
  let queryBus: QueryBus;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        AuthService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('login', () => {
    it('should return a user success login', async () => {
      const mockBody = {
        username: 'qytela',
        password: '123123',
      };
      const mockRes: IAuthLogin = {
        userId: 1,
        token: 'xxxxxxxxxxxx',
        roles: ['user'],
      };

      jest.spyOn(queryBus, 'execute').mockResolvedValue(mockRes as never);
      const result = await service.login(mockBody);

      expect(result).toEqual(
        expect.objectContaining<IAuthLogin>({
          userId: expect.any(Number),
          token: expect.any(String),
          roles: expect.any(Array),
        })
      );
      expect(queryBus.execute).toHaveBeenCalledWith(new GetUserLoginQuery(1));
    });

    it('should return a user failed login', async () => {
      const mockBody = {
        username: 'qytela',
        password: 'xxx',
      };

      try {
        await service.login(mockBody);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });

  describe('me', () => {
    it('should return a user data', async () => {
      const result = await service.me();

      expect(result).toEqual(
        expect.objectContaining<IAuthMe>({
          userId: expect.any(Number),
          name: expect.any(String),
          roles: expect.any(Array),
        })
      );
    });
  });
});
