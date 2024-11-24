// 사용자 엔티티 (테이블) 정의

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserMedicine } from './userMedicine.entity';

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

  @OneToMany(() => UserMedicine, (userMedicine) => userMedicine.user)
  userMedicines: UserMedicine[];
}
