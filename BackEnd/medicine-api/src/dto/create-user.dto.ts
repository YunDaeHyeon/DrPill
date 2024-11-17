import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  email: string;

  @IsString()
  nickname: string;

  @IsString()
  interest_disease: string;

  @IsString()
  interest_medicine: string;

  @IsString()
  birthday: string;

  @IsString()
  gender: string;
}
