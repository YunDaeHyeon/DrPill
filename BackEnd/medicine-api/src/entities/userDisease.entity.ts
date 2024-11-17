import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Disease } from './disease.entity';

@Entity('UserDisease')
export class UserDisease {
  @PrimaryGeneratedColumn()
  udid: number;

  @ManyToOne(() => User, (user) => user.userDiseases)
  user: User;

  @ManyToOne(() => Disease, (disease) => disease.userDiseases)
  disease: Disease;
}
