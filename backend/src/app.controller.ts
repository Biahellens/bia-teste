import { Controller, Get, Inject } from '@nestjs/common'; // Importe Inject
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject(AppService) 
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}