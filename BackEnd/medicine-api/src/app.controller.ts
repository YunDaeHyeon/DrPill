import { Controller, Get, Query, Post, Body, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { CreateMedicineDTO } from './dto/create-medicine.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 회원가입
  @Post('create-user')
  creatUser(@Body() user: CreateUserDTO) {
    return this.appService.createUser(user);
  }

  // 약 즐겨찾기
  @Post('/favorite-medicine')
  addFavoriteMedicine(@Body() medicine: CreateMedicineDTO) {
    return this.appService.addFavoriteMedicine(medicine);
  }

  // 약 즐겨찾기 해제
  @Delete('/favorite-remove')
  removeFavoriteMedicine(@Body() data: { uid: number; itemSeq: number }) {
    return this.appService.removeFavoriteMedicine(data.uid, data.itemSeq);
  }

  // 약 즐겨찾기 목록 호출
  @Get('/favorite-get')
  getFavoriteMedicine(@Query('uid') uid: number) {
    return this.appService.getFavoriteMedicine(uid);
  }
}
