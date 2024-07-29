import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { CqrsModule, CommandBus, QueryBus } from '@nestjs/cqrs';
import { createMock } from '@golevelup/ts-jest';

import { AuthService } from './auth.service';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { QueryHandlers } from './queries/handlers';

import type { IAuthLogin, IAuthMe } from 'shared/interfaces/Auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        AuthService,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        {
          provide: CommandBus,
          useValue: createMock<CommandBus>(),
        },
        {
          provide: QueryBus,
          useValue: createMock<QueryBus>(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return a user success login', async () => {
      const mockBody = {
        username: 'qytela',
        password: '123123',
      };
      const result = await service.login(mockBody);

      expect(result).toEqual(
        expect.objectContaining<IAuthLogin>({
          userId: expect.any(Number),
          token: expect.any(String),
          roles: expect.any(Array),
        })
      );
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
