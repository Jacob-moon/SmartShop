export class UserResponsDto {
    id: number;
    email: string;
    name: string;
    role: 'user' | 'admin';
    created_at: Date;
}