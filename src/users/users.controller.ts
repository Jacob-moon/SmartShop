import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from './user.decorator';


@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getProfile(@Param('id') idParam: string, @CurrentUser('userId') userId: number,) {
    const id = Number(idParam);

    if(id !== userId) {
      throw new ForbiddenException('접근 권한이 없습니다.')
    }
    
    return this.usersService.getUserById(id);
  }
  
}
