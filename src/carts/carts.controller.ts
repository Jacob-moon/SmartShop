import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CurrentUser } from 'src/users/user.decorator';
import { Cart } from './entities/cart.entity';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  async getCart(@CurrentUser('userId') userId:number):Promise<Cart>{
    return this.cartsService.getCartByUser(userId);
  }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.cartsService.findOne(+id);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.cartsService.remove(+id);
//   }
// }
