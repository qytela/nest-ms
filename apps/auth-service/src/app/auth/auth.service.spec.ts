import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { CqrsModule, CommandBus, QueryBus } from '@nestjs/cqrs';
import { createMock } from '@golevelup/ts-jest';

import { AuthService } from './auth.service';
import { UserRegisterCommand } from './commands/impl/user-register.command';
import { GetUserLoginQuery } from './queries/impl/get-user-login.query';

import type { IAuthLogin, IAuthMe, IAuthRegister } from 'shared/interfaces/Auth';

describe('AuthService', () => {
  let service: AuthService;
  let cmdBus: CommandBus;
  let queryBus: QueryBus;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        AuthService,
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
    cmdBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('login', () => {
    it('should return a user success login', async () => {
      const mockRes: IAuthLogin = {
        userId: 1,
        token: 'xxxxxxxxxxxx',
        roles: ['user'],
      };

      jest.spyOn(queryBus, 'execute').mockResolvedValue(mockRes);
      const result = await queryBus.execute(new GetUserLoginQuery(1));

      expect(queryBus.execute).toHaveBeenCalled();
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
        const result = await service.login(mockBody);
        expect(result).toHaveBeenCalled();
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });

  describe('register', () => {
    it('should return a user success register', async () => {
      const mockBody = {
        name: 'Fansa',
        username: 'fansa',
        password: '123123',
      };
      const mockRes: IAuthRegister = {
        name: 'Fansa',
        username: 'fansa',
        password: '123123',
      };

      jest.spyOn(cmdBus, 'execute').mockResolvedValue(mockRes);
      const result = await cmdBus.execute(new UserRegisterCommand(mockBody));

      expect(cmdBus.execute).toHaveBeenCalled();
      expect(result).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          username: expect.any(String),
          password: expect.any(String),
        })
      );
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
