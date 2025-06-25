import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;
}
