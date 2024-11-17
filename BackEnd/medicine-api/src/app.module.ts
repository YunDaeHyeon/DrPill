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
import { UserMedicineCategory } from './entities/userMedicineCategory.entity';
import { RelationMedicineCategory } from './entities/relationMedicineCategory.entity';

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
          Disease, // 질환(질병)
          Medicine, // 의약품
          MedicineCategory, // 의약품 식별코드
          UserDisease, // 사용자-질환(질병) 정의
          UserMedicineCategory, // 사용자-의약품식별코드 정의
          RelationMedicineCategory, // 의약품-의약품식별코드 정의
        ], // 모든 엔티티 추가
      }),
    }),
    TypeOrmModule.forFeature([
      User,
      Disease,
      Medicine,
      MedicineCategory,
      UserDisease,
      UserMedicineCategory,
      RelationMedicineCategory,
    ]), // TypeORM이 관리할 엔티티 추가
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
