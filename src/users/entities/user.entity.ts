import { Cart } from "src/carts/entities/cart.entity";
import {Column, CreateDateColumn, Entity,OneToOne,PrimaryGeneratedColumn} from "typeorm";

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

    @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
    role: 'user' | 'admin';

    @CreateDateColumn()
    created_at: Date;

    @OneToOne(() => Cart, (cart) => cart.user)
    cart: Cart;
}
