import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total_price: number;

  @Column({ type: 'enum', enum: ['pending', 'paid', 'shipped'] })
  status: 'pending' | 'paid' | 'shipped';

  @CreateDateColumn()
  created_at: Date;
}