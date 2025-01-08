import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('PillInfo') // 테이블 이름
export class PillInfo {
  @PrimaryColumn({ type: 'int' }) // PK이며 자동 증가 없음
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  companyName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  productImage: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  imprintFront: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  imprintBack: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  drugForm: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  colorFront: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  categoryCode: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  categoryName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  generalOrSpecial: string;
}
