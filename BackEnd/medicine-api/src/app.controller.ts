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

  @Post('create-user')
  creatUser(@Body() user: CreateUserDTO) {
    return this.appService.createUser(user);
  }

  @Post('/favorite-medicine')
  addFavoriteMedicine(@Body() medicine: CreateMedicineDTO) {
    return this.appService.addFavoriteMedicine(medicine);
  }

  @Delete('/favorite-remove')
  removeFavoriteMedicine(@Body() data: { uid: number; itemSeq: number }) {
    return this.appService.removeFavoriteMedicine(data.uid, data.itemSeq);
  }

  @Get('/favorite-get')
  getFavoriteMedicine(@Query('uid') uid: number) {
    return this.appService.getFavoriteMedicine(uid);
  }

  // 촬영된 약 검색
  @Post('/search-pill')
  async searchPill(
    @Body()
    {
      shape,
      color,
      descript,
    }: {
      shape: string;
      color: string;
      descript: string;
    },
  ) {
    return this.appService.searchPill(shape, color, descript);
  }
}
