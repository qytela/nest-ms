import { TestBed } from '@automock/jest';
import { UnauthorizedException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AuthService } from './auth.service';
import { UserRegisterCommand } from './commands/impl/user-register.command';
import { GetUserLoginQuery } from './queries/impl/get-user-login.query';

import type { IAuthLogin, IAuthMe, IAuthRegister } from 'shared/interfaces/Auth';

describe('AuthService', () => {
  let service: AuthService;
  let cmdBus: jest.Mocked<CommandBus>;
  let queryBus: jest.Mocked<QueryBus>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(AuthService).compile();

    service = unit;
    cmdBus = unitRef.get<CommandBus>(CommandBus);
    queryBus = unitRef.get<QueryBus>(QueryBus);
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

      queryBus.execute.mockResolvedValue(mockRes);
      const result = await service.login(mockBody);

      expect(queryBus.execute).toHaveBeenCalled();
      expect(queryBus.execute).toHaveBeenCalledWith(new GetUserLoginQuery(1));
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

      cmdBus.execute.mockResolvedValue(mockRes);
      const result = await service.register(mockBody);

      expect(cmdBus.execute).toHaveBeenCalled();
      expect(cmdBus.execute).toHaveBeenCalledWith(new UserRegisterCommand(mockBody));
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
