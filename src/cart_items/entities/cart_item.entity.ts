import { Cart } from "src/carts/entities/cart.entity";
import { ProductOption } from "src/product-options/entities/product-option.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Cart,(cart) => cart.items)
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => ProductOption,(option) => option.cartItems)
  @JoinColumn()
  productOption: ProductOption;
}
