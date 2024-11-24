import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserMedicine } from './entities/userMedicine.entity';
import { Medicine } from './entities/medicine.entity';
import { CreateMedicineDTO } from './dto/create-medicine.dto';

@Injectable()
export class AppService {
  constructor(
    // User 엔티티(사용자 테이블)
    @InjectRepository(User)
    private userRepository: Repository<User>,
    // Medicine 엔티티 (의약품 테이블)
    @InjectRepository(Medicine)
    private medicineRepository: Repository<Medicine>,
    // User - Medicine 엔티티(사용자-의약품 정의)
    @InjectRepository(UserMedicine)
    private umRepository: Repository<UserMedicine>,
  ) {}

  getHello(): string {
    return '기업연계 19조, 백엔드입니다.';
  }

  // POST /create-user
  async createUser(user: CreateUserDTO): Promise<User> {
    // User 테이블에 사용자 정보 저장
    const newUser = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }

  // POST /favorite-medicine
  async addFavoriteMedicine(
    medicineDto: CreateMedicineDTO,
  ): Promise<UserMedicine> {
    const { uid, itemSeq, ...medicineData } = medicineDto;

    // 1. 사용자 찾기
    const user = await this.userRepository.findOne({ where: { uid } });
    if (!user) {
      throw new Error(`사용자 정보를 찾을 수 없습니다.`);
    }

    // 2. 약 정보 찾기 또는 생성
    let medicine = await this.medicineRepository.findOne({
      where: { itemSeq },
    });
    if (!medicine) {
      // 수정: itemImage가 비어있는 경우 기본값 "" 설정
      medicine = this.medicineRepository.create({
        itemSeq,
        ...medicineData,
        itemImage: medicineData.itemImage || '', // 기본값 추가
      });
      medicine = await this.medicineRepository.save(medicine);
    }

    // 3. 즐겨찾기 관계 확인
    const existingRelation = await this.umRepository.findOne({
      where: { user: { uid }, medicine: { itemSeq } },
    });

    if (existingRelation) {
      throw new Error('이미 저장한 의약품입니다.');
    }

    // 4. 즐겨찾기 저장
    const userMedicine = this.umRepository.create({ user, medicine });
    return await this.umRepository.save(userMedicine);
  }

  // DELETE /favorite-remove
  async removeFavoriteMedicine(uid: number, itemSeq: number): Promise<void> {
    const relation = await this.umRepository.findOne({
      where: { user: { uid }, medicine: { itemSeq } },
      relations: ['user', 'medicine'], // 관계 불러오기
    });

    if (!relation) {
      throw new Error('해당 약을 저장한 기록이 없습니다.');
    }

    // 2. 관계 삭제
    await this.umRepository.delete(relation.id);
  }

  // GET /favorite-get
  async getFavoriteMedicine(uid: number): Promise<Medicine[]> {
    // 1. 사용자 존재 확인
    const user = await this.userRepository.findOne({ where: { uid } });
    if (!user) {
      throw new Error(`사용자 정보를 찾을 수 없습니다.`);
    }

    // 2. 즐겨찾기된 의약품 조회
    const userMedicines = await this.umRepository.find({
      where: { user: { uid } },
      relations: ['medicine'], // Medicine 정보를 함께 로드
    });

    // 3. Medicine 정보만 추출 및 itemImage 기본값 "" 설정
    const medicines = userMedicines.map((relation) => {
      const medicine = relation.medicine;
      return {
        ...medicine,
        itemImage: medicine.itemImage || '', // 수정: NULL 시 빈 문자열 반환
      };
    });

    return medicines;
  }
}
