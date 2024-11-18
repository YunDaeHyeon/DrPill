import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDisease } from './entities/userDisease.entity';
import { Disease } from './entities/disease.entity';
import { MedicineCategory } from './entities/medicineCategory.entity';
import { UserMedicineCategory } from './entities/userMedicineCategory.entity';

@Injectable()
export class AppService {
  constructor(
    // User 엔티티(사용자 테이블)
    @InjectRepository(User)
    private userRepository: Repository<User>,
    // UserDisease 엔티티(사용자-질환 관계 테이블)
    @InjectRepository(UserDisease)
    private userDiseaseRepository: Repository<UserDisease>,
    // Disease 엔티티 (질환 테이블)
    @InjectRepository(Disease)
    private diseaseRepository: Repository<Disease>,
    // MedicineCategory 엔티티 (의약품 식별코드 분류 테이블)
    @InjectRepository(MedicineCategory)
    private mcRepositody: Repository<MedicineCategory>,
    // UserMedicineCategory 엔티티 (사용자-의약품 식별코드 분류 테이블)
    @InjectRepository(UserMedicineCategory)
    private umcCategory: Repository<UserMedicineCategory>,
  ) {}

  getHello(): string {
    return '기업연계 19조';
  }

  getLogin(user: string): string {
    return `${user}님이 로그인하셨습니다.`;
  }

  // 회원가입 처리
  // POST /create-user
  async createUser(user: CreateUserDTO): Promise<User> {
    // User 테이블에 사용자 정보 저장
    const newUser = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);

    // 관심질환 저장 로직 *******************************

    // 사용자의 관심질환(interest_disease) 파싱 후 배열 변환
    const interestDiseases = user.interest_disease
      .split(',')
      .map((disease) => disease.trim())
      .filter((disease) => disease !== ''); // 빈 값이 넘어온 경우 필터링 진행

    // 만약, interest_disease(관심질환)이 비어있는 경우 UserDisease에 저장하지 않고 즉시 반환
    if (interestDiseases.length === 0) {
      return savedUser;
    }

    // 질환(Disease) 테이블에서 해당 관심 질환 이름을 가진 데이터를 찾기
    const matchedDiseases = await this.diseaseRepository
      .createQueryBuilder('disease') // disease 쿼리 빌더 생성
      .where(
        new Brackets((qb) => {
          // Brackets을 통한 조건 그룹화
          interestDiseases.forEach((name, index) => {
            if (index === 0) {
              // 배열의 첫 번째 요소
              qb.where('disease.disease_name LIKE :name' + index, {
                // 첫 번째 조건
                [`name${index}`]: `%${name}%`, // 'LIKE' 조건으로 부분적으로 일치하는 질환 찾기 (예: '%name%')
              });
            } else {
              // 배열의 두 번째 요소부터
              qb.orWhere('disease.disease_name LIKE :name' + index, {
                // 'OR' 조건을 추가 (기존 조건에 추가적으로 적용)
                [`name${index}`]: `%${name}%`,
              });
            }
          });
        }),
      )
      .getMany(); // 위 조건에 맞는 모든 질환(Disease) 호출

    // UserDisease 테이블에 매핑
    for (const disease of matchedDiseases) {
      const userDisease = this.userDiseaseRepository.create({
        user: savedUser,
        disease: disease,
      });
      await this.userDiseaseRepository.save(userDisease);
    }

    // 관심 의약품 저장 로직 추가 *******************************

    // 사용자의 관심 의약품(interest_medicine) 파싱 후 배열 변환
    const interestMedicines = user.interest_medicine
      .split(',')
      .map((medicine) => medicine.trim())
      .filter((medicine) => medicine !== ''); // 빈 값이 넘어온 경우 필터링 진행

    // MedicineCategory 테이블에서 해당 관심 의약품 이름을 가진 데이터를 찾기
    const matchedMedicineCategories = await this.mcRepositody
      .createQueryBuilder('medicineCategory')
      .where(
        new Brackets((qb) => {
          interestMedicines.forEach((name, index) => {
            if (index === 0) {
              qb.where('medicineCategory.category_name LIKE :name' + index, {
                [`name${index}`]: `%${name}%`,
              });
            } else {
              qb.orWhere('medicineCategory.category_name LIKE :name' + index, {
                [`name${index}`]: `%${name}%`,
              });
            }
          });
        }),
      )
      .getMany(); // 위 조건에 맞는 모든 의약품 카테고리 호출

    // UserMedicineCategory 테이블에 매핑
    for (const category of matchedMedicineCategories) {
      const userMedicineCategory = this.umcCategory.create({
        user: savedUser,
        medicineCategory: category,
      });
      await this.umcCategory.save(userMedicineCategory);
    }

    return savedUser;
  }
}
