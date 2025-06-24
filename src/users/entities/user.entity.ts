import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({default: 'user'})
    role: 'admin' | 'user';

    @CreateDateColumn()
    created_at: Date;
}
