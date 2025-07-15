import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from 'src/cart_items/entities/cart_item.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ){}
async getCartByUser(userId: number): Promise<Cart> {
  let cart = await this.cartRepository.findOne({
    where: { user: { id: userId } },
    relations: ['user', 'items', 'items.productOption'],
  });
  if (!cart) {
    const newCart = this.cartRepository.create({ user: { id: userId }, items: [] });
    cart = await this.cartRepository.save(newCart);
  }
  return cart;
}
}
