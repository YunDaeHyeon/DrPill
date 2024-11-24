import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Medicine } from './medicine.entity';
import { User } from './user.entity';

@Entity('UserMedicine')
export class UserMedicine {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userMedicines, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Medicine, (medicine) => medicine.userMedicines, {
    onDelete: 'CASCADE',
  })
  medicine: Medicine;

  @CreateDateColumn()
  createdAt: Date; // "하트"를 누른 날짜
}
