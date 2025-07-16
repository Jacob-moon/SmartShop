import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CurrentUser } from 'src/users/user.decorator';
import { Cart } from './entities/cart.entity';
import { CreateCartItemDto } from 'src/cart_items/dto/create-cart_item.dto';
import { CartItem } from 'src/cart_items/entities/cart_item.entity';
import { UpdateCartItemDto } from 'src/cart_items/dto/update-cart_item.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  async getCart(@CurrentUser('userId') userId:number):Promise<Cart>{
    return this.cartsService.getCartByUser(userId);
  }
  
  @Post('items')
  @HttpCode(201)
  async addItem(
    @CurrentUser('userId') userId: number,
    @Body() createCartItemDto:CreateCartItemDto,
  ):Promise<CartItem>{
   return this.cartsService.addItem(userId, createCartItemDto); 
  }

  @Patch('items/:id')
  @HttpCode(200)
  async updateItem(
    @CurrentUser('userId') userId: number,
    @Param('id', ParseIntPipe) itemId:number,
    @Body() updateCartItemDto:UpdateCartItemDto,
  ): Promise<void>{
    return this.cartsService.updateItem(userId,itemId,updateCartItemDto)
  }
 
}
