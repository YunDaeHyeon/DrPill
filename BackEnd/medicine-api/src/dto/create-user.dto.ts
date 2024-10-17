import { IsString, IsNumber } from 'class-validator';

export class CreateUserDTO{

    @IsString()
    readonly email: string;

    @IsString()
    readonly nickname: string;
}