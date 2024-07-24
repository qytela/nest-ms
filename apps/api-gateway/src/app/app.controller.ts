import { Controller, Get, Req } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(@Req() req) {
    return this.appService.getData(req);
  }

  @Get('test-fail')
  testFail(@Req() req) {
    return this.appService.testFail(req);
  }
}
