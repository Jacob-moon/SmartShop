import { CartItem } from "src/cart_items/entities/cart_item.entity";
import { OrderItem } from "src/order_items/entities/order_item.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @ManyToOne(() => Product,(product) => product.options)
  product: Product;

  @OneToMany(() => CartItem, (item) => item.productOption)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (item) => item.productOption)
  orderItems: OrderItem[];
}
