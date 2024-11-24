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
  @Column({ type: 'text', nullable: true })
  itemName: String;

  // 약 이미지
  @Column({ type: 'text', nullable: true })
  itemImage: String;

  // 업체명
  @Column({ type: 'text', nullable: true })
  entpName: String;

  // 효능
  @Column({ type: 'text', nullable: true })
  efcyQesitm: String;

  // 사용법
  @Column({ type: 'text', nullable: true })
  useMethodQesitm: String;

  // 주의사항
  @Column({ type: 'text', nullable: true })
  atpnQesitm: String;

  // 부작용
  @Column({ type: 'text', nullable: true })
  seQesitm: String;

  // 보관법
  @Column({ type: 'text', nullable: true })
  depositMethodQesitm: String;

  @OneToMany(() => UserMedicine, (userMedicine) => userMedicine.medicine)
  userMedicines: UserMedicine[];
}
