import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Disease } from './entities/disease.entity';
import { Medicine } from './entities/medicine.entity';
import { MedicineCategory } from './entities/medicineCategory.entity';
import { UserDisease } from './entities/userDisease.entity';
import { UserCategory } from './entities/userCategory.entity';

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
          User,
          Disease,
          Medicine,
          MedicineCategory,
          UserDisease,
          UserCategory,
        ], // 모든 엔티티 추가
      }),
    }),
    TypeOrmModule.forFeature([
      User,
      Disease,
      Medicine,
      MedicineCategory,
      UserDisease,
      UserCategory,
    ]), // TypeORM이 관리할 엔티티 추가
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
