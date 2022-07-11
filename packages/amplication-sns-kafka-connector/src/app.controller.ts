import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { NotificationDto } from './dto';

@Controller()
export class AppController {
  constructor(@Inject('MAIN_KAFKA') private readonly client: ClientKafka) {}

  @Post('/notification')
  generate(@Body() notificationDto: NotificationDto) {
    return this.client.emit('code.generation.result', notificationDto);
  }
}
