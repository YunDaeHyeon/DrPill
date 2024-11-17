import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDisease } from './entities/userDisease.entity';
import { Disease } from './entities/disease.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserDisease)
    private userDiseaseRepository: Repository<UserDisease>,
    @InjectRepository(Disease)
    private diseaseRepository: Repository<Disease>,
  ) {}

  getHello(): string {
    return '기업연계 19조';
  }

  getLogin(user: string): string {
    return `${user}님이 로그인하셨습니다.`;
  }

  // 회원가입 처리
  async createUser(user: CreateUserDTO): Promise<User> {
    // User 테이블에 사용자 정보 저장
    const newUser = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);

    // 사용자의 관심질환(interest_disease) 파싱 후 배열 변환
    const interestDiseases = user.interest_disease
      .split(',')
      .map((disease) => disease.trim());

    // 질환(Disease) 테이블에서 해당 관심 질환 이름을 가진 데이터를 찾기
    const matchedDiseases = await this.diseaseRepository
      .createQueryBuilder('disease') // disease 쿼리 빌더 생성
      .where(
        // 조건문 입력
        new Brackets((qb) => {
          // 여러 조건 그룹화
          interestDiseases.forEach((name, index) => {
            // 4. interestDiseases 배열을 순회하면서 각 항목에 대해 처리
            if (index === 0) {
              // 5. 배열의 첫 번째 요소일 경우
              qb.where('disease.disease_name LIKE :name' + index, {
                // 6. 첫 번째 조건은 'WHERE' 절에 추가
                [`name${index}`]: `%${name}%`, // 7. 'LIKE' 조건으로 부분적으로 일치하는 질환을 찾음 (예: '%name%')
              });
            } else {
              // 8. 배열의 두 번째 요소부터는
              qb.orWhere('disease.disease_name LIKE :name' + index, {
                // 9. 'OR' 조건을 추가 (기존 조건에 추가적으로 적용)
                [`name${index}`]: `%${name}%`, // 10. 'LIKE' 조건으로 부분적으로 일치하는 질환을 찾음
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

    return savedUser;
  }
}
