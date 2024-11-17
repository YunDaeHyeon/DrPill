// 질환 엔티티 (테이블) 정의

import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { UserDisease } from './userDisease.entity';

@Entity('Disease')
export class Disease {
  @PrimaryColumn()
  did: number;

  @Column()
  disease_name: string;

  @OneToMany(() => UserDisease, (userDisease) => userDisease.disease)
  userDiseases: UserDisease[];
}
