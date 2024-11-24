import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  email: string;

  @IsString()
  nickname: string;

  @IsString()
  birthday: string;

  @IsString()
  gender: string;
}
