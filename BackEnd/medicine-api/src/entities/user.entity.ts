// 사용자 엔티티 (테이블) 정의

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  readonly email: string;

  @Column()
  readonly nickname: string;

  @Column()
  readonly interest_disease: string;
}
