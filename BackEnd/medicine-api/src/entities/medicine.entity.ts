// 의약품 엔티티 (테이블) 정의

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Medicine')
export class MedicineEntity {
  // 식약분류
  @Column()
  readonly medicine_class: number;

  // 주성분코드
  @Column()
  readonly mc_code: string;

  // 제품코드
  @PrimaryGeneratedColumn()
  mid: number;

  // 제품명
  @Column()
  readonly medicine_name: string;

  // 업체명
  @Column()
  readonly company_name: string;

  // ATC 코드
  @Column()
  readonly atc_code: string;
}
