import { Controller, Get, Post, Body, Param, Delete, HttpCode, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createAuthDto: CreateAuthDto): Promise<void> {
    return this.authService.signup(createAuthDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() LoginAuthDto: LoginAuthDto,
  ):Promise<{ accessToken: string }> {
    return this.authService.login(LoginAuthDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: JwtRequest): Promise<User> {
    return this.authService.getProfile(req.user.userId);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async logout(@Req() req: Request):Promise<void> {
    const token = req.header.authorization.split(' ')[1];
    await this.authService.logout(token);
  }
}
