export class UserResponseDto {
    id: number;
    email: string;
    name: string;
    role: 'user' | 'admin';
    created_at: Date;
}
//TODO : 생성자 방식으로 변경