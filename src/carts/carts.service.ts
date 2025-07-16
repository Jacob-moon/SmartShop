import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from 'src/cart_items/entities/cart_item.entity';
import { CreateCartItemDto } from 'src/cart_items/dto/create-cart_item.dto';
import { UpdateCartItemDto } from 'src/cart_items/dto/update-cart_item.dto';
import { CartResponseDto } from './dto/cart-reponse.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ){}

  /** 
  * ToDo: 성능최적화 => 
  * 로직 분리 : 1.카트 있을시 userId 반환 및 카트 없을시 카드 생성 
  *           2.카트에 담을수있도록 배열생성 및 카트 저장
  */
async getCartByUser(userId: number): Promise<CartResponseDto> {
  let cart = await this.cartRepository.findOne({
    where: { user: { id: userId } },
    relations: [
      'user',
      'items',
      'items.productOption',
      'items.productOption.product'
    ],
  });
  if (!cart) {
    const newCart = this.cartRepository.create({ user: { id: userId }, items: [] });
    cart = await this.cartRepository.save(newCart);
  }
  return {
    id: cart.id,
    user_id: cart.user.id,
    items: cart.items.map(item => ({
      id: item.id,
      product_options_id: item.productOption.id,
      quantity: item.quantity,
      product_name: item.productOption.product.name,
      option_name: item.productOption.name,
      price: item.productOption.product.price,
    }))
  };
}
async addItem(userId: number, createCartItemDto:CreateCartItemDto): Promise<CartItem>{
  const cart = await this.getCartByUser(userId);
  let item = await this.cartItemRepository.findOne({
    where: { 
      cart: { id: cart.id }, 
      productOption: { id:createCartItemDto.product_options_id } 
    },
    relations: ['cart']
  });
  if (item) {
    item.quantity += createCartItemDto.quantity;
  }else {
    item = this.cartItemRepository.create({
      cart: { id:cart.id },
      productOption: { id: createCartItemDto.product_options_id },
      quantity: createCartItemDto.quantity,
    });
  }
  return this.cartItemRepository.save(item);
}
async updateItem(
  userId: number,
  itemId: number,
  updateCartItemDto:UpdateCartItemDto,
): Promise<void> {
  const item = await this.cartItemRepository.findOne({
    where : { id:itemId },
    relations: [ 'cart', 'cart.user' ]
  });
  if(!item) throw new NotFoundException('장바구니 아이템을 찾을 수 없습니다.');
  if(item.cart.user.id !== userId) throw new ForbiddenException('권한이 없습니다.');
  item.quantity = updateCartItemDto.quantity;
  await this.cartItemRepository.save(item);
}
async removeItem(userId: number, itemId: number):Promise<void>{
  const item = await this.cartItemRepository.findOne({
    where: { id: itemId },
    relations: ['carts', 'cart.user'],
  });
  if (!item) throw new NotFoundException('장바구니 아이템을 찾을 수 없습니다.');
  if (item.cart.user.id !== userId) throw new ForbiddenException('권한이 없습니다.')
    await this.cartItemRepository.delete({ id:itemId });
  }
}
