import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get()
  @Render('index')
  getIndex() {
    return { title: 'Главная страница' };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
