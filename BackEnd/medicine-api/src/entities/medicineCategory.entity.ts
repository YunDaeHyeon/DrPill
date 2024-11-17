import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserCategory } from './userCategory.entity';

@Entity('MedicineCategory')
export class MedicineCategory {
  @PrimaryGeneratedColumn()
  cid: number; // `cid`는 고유한 ID, 기본 키로 사용됩니다.

  @OneToMany(() => UserCategory, (userCategory) => userCategory.category)
  category: number; // 외래키 연결

  @Column()
  category_name: string;
}

/*
@OneToMany() 데코레이터 자체는 FK를 직접 생성하지 않는다.
따라서 category라는 필드는 테이블에 직접 포함되지 않는다.
해당 필드는 TypeScirpt 상에서 UserCategory와의 관계를 정의하기 위해 사용된 것이다.
따라서 테이블에 직접적으로 매핑되지 않음.
*/
