// 사용자 엔티티 (테이블) 정의

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserDisease } from './userDisease.entity';
import { UserCategory } from './userCategory.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  birthday: string;

  @Column()
  gender: string;

  @Column()
  interest_disease: string;

  @Column()
  interest_medicine: string;

  // 한 명의 사용자는 여러 개의 질환(관심)을 가진다. (1:N)
  @OneToMany(() => UserDisease, (userDisease) => userDisease.user)
  userDiseases: UserDisease[];

  // 한 명의 사용자는 여러 개의 식약분류(관심)을 가진다. (1:N)
  @OneToMany(() => UserCategory, (userCategory) => userCategory.user)
  userCategories: UserCategory[];
}
