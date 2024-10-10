import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '기업연계 19조';
  }
}
