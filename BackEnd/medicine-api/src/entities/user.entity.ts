import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity{

    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    readonly email: string;

    @Column()
    readonly nickname: string;
}