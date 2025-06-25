import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginAuthDto {
    @IsEmail({},{ message: "'올바은 이메일을 입력해주세요.'"})
    email:string;

    @IsNotEmpty({ message: '비밀번호를 입력해주세요.'})
    password: string;
}