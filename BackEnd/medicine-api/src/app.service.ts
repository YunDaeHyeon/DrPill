import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  getHello(): string {
    return '기업연계 19조';
  }

  getLogin(user: string): string {
    return `${user}님이 로그인하셨습니다.`;
  }

  async createUser(user: CreateUserDTO): Promise<UserEntity>{
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }
}

