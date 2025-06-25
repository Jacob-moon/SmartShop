import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;
}
