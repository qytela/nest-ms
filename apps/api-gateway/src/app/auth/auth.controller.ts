import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body, @Req() req) {
    return this.authService.login(body, req);
  }

  @Post('register')
  register(@Body() body, @Req() req) {
    return this.authService.register(body, req);
  }

  @Get('me')
  me(@Req() req) {
    return this.authService.me(req);
  }
}
