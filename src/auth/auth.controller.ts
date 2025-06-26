import { Controller, Get, Post, Body, Param, Delete, HttpCode, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { CurrentUser } from '../users/user.decorator'
import { User } from 'src/users/entities/user.entity';
import { UserResponseDto } from 'src/users/dto/user-response.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createAuthDto: CreateAuthDto): Promise<UserResponseDto> {
    return this.authService.signup(createAuthDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() LoginAuthDto: LoginAuthDto,
  ):Promise<{ accessToken: string; user: UserResponseDto }> {
    return this.authService.login(LoginAuthDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser('userId') userId: number): Promise<User> {
    return this.authService.getProfile(userId);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async logout(@CurrentUser() user: { userId: number }, @Req() req: Request): Promise<void> {
    const authHeader = req.header('authorization');
    if (!authHeader) throw new Error('No token found');
    const token = authHeader.split(' ')[1];
    await this.authService.logout(token);
  }
}
