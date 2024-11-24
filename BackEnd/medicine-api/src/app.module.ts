import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Medicine } from './entities/medicine.entity';
import { UserMedicine } from './entities/userMedicine.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 환경 변수 설정
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        synchronize: true,
        entities: [
          User, // 사용자
          UserMedicine, // 사용자-의약품 관계
          Medicine, // 의약품
        ], // 모든 엔티티 추가
      }),
    }),
    TypeOrmModule.forFeature([User, UserMedicine, Medicine]), // TypeORM이 관리할 엔티티 추가
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
