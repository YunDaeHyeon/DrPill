import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { MedicineCategory } from './medicineCategory.entity';

@Entity('UserCategory')
export class UserCategory {
  @PrimaryGeneratedColumn()
  ucid: number;

  @ManyToOne(() => User, (user) => user.userCategories)
  user: User;

  @ManyToOne(
    () => MedicineCategory,
    (medicineCategory) => medicineCategory.category,
  )
  category: MedicineCategory;
}
