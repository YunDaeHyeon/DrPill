// 질환 엔티티 (테이블) 정의

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Disease')
export class DiseaseEntity {
  @PrimaryGeneratedColumn()
  did: number;

  @Column()
  readonly disease_name: string;
}
