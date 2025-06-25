import { Order } from "src/orders/entities/order.entity";
import { ProductOption } from "src/product-options/entities/product-option.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn()
  order: Order;
  
  @ManyToOne(() => ProductOption, (option) => option.orderItems)
  @JoinColumn()
  productOption: ProductOption;
}