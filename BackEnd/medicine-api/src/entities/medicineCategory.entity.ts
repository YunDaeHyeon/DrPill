import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { UserMedicineCategory } from './userMedicineCategory.entity';
import { RelationMedicineCategory } from './relationMedicineCategory.entity';

@Entity('MedicineCategory')
export class MedicineCategory {
  @PrimaryColumn()
  cid: number; // `cid`는 고유한 ID, 기본 키로 사용됩니다.

  @OneToMany(
    () => UserMedicineCategory,
    (userMedicineCategory) => userMedicineCategory.medicineCategory,
  )
  userMedicineCategories: UserMedicineCategory[];

  @OneToMany(
    () => RelationMedicineCategory,
    (relationMedicineCategory) => relationMedicineCategory.category,
  )
  medicines: RelationMedicineCategory[];

  @Column()
  category_name: string;
}
