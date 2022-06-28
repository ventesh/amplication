import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AppService } from './app.service';
import { NotificationDto } from './dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MAIN_KAFKA') private readonly client: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/notification')
  generate(@Body() notificationDto: NotificationDto) {
    return this.client.emit('code.generation.result', notificationDto);
  }
}
