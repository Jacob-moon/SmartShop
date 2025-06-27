import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ForbiddenException, HttpCode, ValidationPipe } from '@nestjs/common';
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

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') idParam: string, 
    @Body(new ValidationPipe({ whitelist: true, transform: true })) updateDto: UpdateUserDto,
    @CurrentUser('userId') userId: number,
  ) {
    const id = Number(idParam);
    if (id !== userId) {
      throw new ForbiddenException('권한이 없습니다.');
    }
    await this.usersService.updateUser(id, updateDto);
    return { message: '유저 정보가 수정되었습니다.' };
  }
  
  @Delete(':id')
  @HttpCode(200)
  async remove(
    @Param('id') idParam :string,
    @CurrentUser('userId') userId: number,
  ) {
    const id = Number(idParam);
    if(id !== userId) {
      throw new ForbiddenException('권한이 없습니다.');
    }
    await this.usersService.deleteUser(id);
    return { message: '회원 탈퇴가 완료되었습니다.' };
  }
}
