import { ProductOption } from "src/product-options/entities/product-option.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text',{
        nullable: true,
    })
    description?: string;

    @Column()
    price: number;

    @Column()
    stock: number;

    @Column({
        nullable: true,
    })
    image_url: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, (user) => user.products)
    @JoinColumn()
    user:User;

    @OneToMany(() => ProductOption, (option) => option.product)
    options: ProductOption[];
}