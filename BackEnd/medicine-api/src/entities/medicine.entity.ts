// 의약품 엔티티 (테이블) 정의
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { UserMedicine } from './userMedicine.entity';

@Entity('Medicine')
export class Medicine {
  // 품목기준코드 PK
  @PrimaryColumn()
  itemSeq: number;

  // 약 이름
  @Column({ type: 'text' })
  itemName: String;

  // 약 이미지
  @Column({ type: 'text' })
  itemImage: String;

  // 업체명
  @Column({ type: 'text' })
  entpName: String;

  // 효능
  @Column({ type: 'text' })
  efcyQesitm: String;

  // 사용법
  @Column({ type: 'text' })
  useMethodQesitm: String;

  // 주의사항
  @Column({ type: 'text' })
  atpnQesitm: String;

  // 부작용
  @Column({ type: 'text' })
  seQesitm: String;

  // 보관법
  @Column({ type: 'text' })
  depositMethodQesitm: String;

  @OneToMany(() => UserMedicine, (userMedicine) => userMedicine.medicine)
  userMedicines: UserMedicine[];
}
