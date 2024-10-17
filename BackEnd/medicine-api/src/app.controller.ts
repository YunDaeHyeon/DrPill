import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("login")
  getLogin(@Query('id') user: string): string{
    return this.appService.getLogin(user);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("create-user")
  creatUser(@Body() user: CreateUserDTO) {
    return this.appService.createUser(user);
  }

}
