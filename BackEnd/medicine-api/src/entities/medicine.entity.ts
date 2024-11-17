// 의약품 엔티티 (테이블) 정의
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { RelationMedicineCategory } from './relationMedicineCategory.entity';

@Entity('Medicine')
export class Medicine {
  // 식약분류
  @Column()
  category_name: string;

  // 주성분코드
  @Column()
  medicine_class: string;

  // 제품코드 (PK)
  @PrimaryColumn()
  mid: number;

  // 제품명
  @Column()
  medicine_name: string;

  // 업체명
  @Column()
  company_name: string;

  // ATC 코드
  @Column()
  atc_code: string;

  // 하나의 의약품(여러개의 의약품)은 하나의 식별분류에 속한다.
  @OneToMany(() => RelationMedicineCategory, (relation) => relation.medicine)
  relationCategories: RelationMedicineCategory[];
}
