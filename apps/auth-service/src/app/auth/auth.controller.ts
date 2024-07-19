import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth_login')
  login() {
    return this.authService.login();
  }

  @MessagePattern('auth_me')
  me() {
    return this.authService.me();
  }
}
