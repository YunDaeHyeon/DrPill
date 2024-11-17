import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MedicineCategory } from './medicineCategory.entity';
import { Medicine } from './medicine.entity';

@Entity('RelationMedicineCategory')
export class RelationMedicineCategory {
  @PrimaryGeneratedColumn()
  rmid: number;

  // 하나의 식별분류는 여러 개의 의약품과 연결될 수 있음. (1:N)
  // ex) "진통제" : "타이레놀1, 테이레놀2"
  @ManyToOne(() => MedicineCategory, (category) => category.medicines)
  category: MedicineCategory;

  // 하나의 약은(여러개의 약은) 하나의 식별분류에 연결된다. (N:1)
  // ex) "타이레놀1, 타이레놀2" : "진통제"
  @ManyToOne(() => Medicine, (medicine) => medicine.relationCategories)
  medicine: Medicine;
}
