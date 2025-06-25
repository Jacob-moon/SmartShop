import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    // @ManyToOne(() => User, (user) => user.products,{onDelete: 'CSCADE'})
    // user:User;
}