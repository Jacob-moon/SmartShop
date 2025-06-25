import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsEmail({},{ message: "'올바은 이메일을 입력해주세요.'"})
    email:string;

    @IsNotEmpty({ message: '비밀번호를 입력해주세요.'})
    @IsString()
    password: string;

    @IsNotEmpty({ message: '이름을 입력해주세요.'})
    @IsString()
    name: string;
}
