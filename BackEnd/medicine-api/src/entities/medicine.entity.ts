// 의약품 엔티티 (테이블) 정의

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MedicineCategory } from './medicineCategory.entity';

@Entity('Medicine')
export class Medicine {
  // 제품코드
  @PrimaryGeneratedColumn()
  mid: number;

  // 주성분코드
  @Column()
  mc_code: string;

  // 제품명
  @Column()
  medicine_name: string;

  // 업체명
  @Column()
  company_name: string;

  // ATC 코드
  @Column()
  atc_code: string;
}
