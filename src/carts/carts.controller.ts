import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CurrentUser } from 'src/users/user.decorator';
import { CreateCartItemDto } from 'src/cart_items/dto/create-cart_item.dto';
import { CartItem } from 'src/cart_items/entities/cart_item.entity';
import { UpdateCartItemDto } from 'src/cart_items/dto/update-cart_item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CartResponseDto } from './dto/cart-reponse.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  /**
   * 
   * ToDo: 추후 비회원 추가 예정 현재 회원만 장바구니 전급가능
   * 
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async getCart(@CurrentUser('userId') userId:number):Promise<CartResponseDto>{
    return this.cartsService.getCartByUser(userId);
  }
  
  @Post('items')
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async addItem(
    @CurrentUser('userId') userId: number,
    @Body() createCartItemDto:CreateCartItemDto,
  ):Promise<CartItem>{
   return this.cartsService.addItem(userId, createCartItemDto); 
  }
  
  @Patch('items/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async updateItem(
    @CurrentUser('userId') userId: number,
    @Param('id', ParseIntPipe) itemId:number,
    @Body() updateCartItemDto:UpdateCartItemDto,
  ): Promise<void>{
    return this.cartsService.updateItem(userId,itemId,updateCartItemDto)
  }
  
  @Delete('items/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async removeItem(
    @CurrentUser('userId') userId:number,
    @Param('id',ParseIntPipe) itemId: number,
  ):Promise<void>{
    return this.cartsService.removeItem(userId,itemId);
  }
}
