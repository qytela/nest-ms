import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.login')
  login(@Payload() payload) {
    return this.authService.login(payload);
  }

  @MessagePattern('auth.register')
  register(@Payload() payload) {
    return this.authService.register(payload);
  }

  @MessagePattern('auth.me')
  me() {
    return this.authService.me();
  }
}
