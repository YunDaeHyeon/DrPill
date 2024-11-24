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
  @Column()
  itemName: String;

  // 약 이미지
  @Column()
  itemImage: String;

  // 업체명
  @Column()
  entpName: String;

  // 효능
  @Column()
  efcyQesitm: String;

  // 사용법
  @Column()
  useMethodQesitm: String;

  // 주의사항
  @Column()
  atpnQesitm: String;

  // 부작용
  @Column()
  seQesitm: String;

  // 보관법
  @Column()
  depositMethodQesitm: String;

  @OneToMany(() => UserMedicine, (userMedicine) => userMedicine.medicine)
  userMedicines: UserMedicine[];
}
