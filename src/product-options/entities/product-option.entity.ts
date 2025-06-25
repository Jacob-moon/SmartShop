import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product_options')
export class ProductOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price_diff: number;

  @Column({ nullable: true })
  stock: number;

  @Column({ default: true })
  is_active: boolean;
}
