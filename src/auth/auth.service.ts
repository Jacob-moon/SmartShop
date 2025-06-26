import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

interface JwtPayload {
  email: string;
  userId: number;
}

@Injectable()
export class AuthService {

  private tokenBlacklist: Set<String> = new Set();

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ){}
  
  async signup(createAuthDto: CreateAuthDto): Promise<UserResponseDto> {
    const { email , password , name } =createAuthDto;

    const existing = await this.userRepository.findOne({ where : { email } });
    if (existing) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });
    try{
      const savedUser = await this.userRepository.save(user);
      const { password, ...result } = savedUser;
      return result;
    }catch (error) {
      throw new ConflictException('유저 생성에 실패 하였습니다.')
    }
  }

  async login(loginAuthDto: LoginAuthDto):Promise<{ accessToken: string }> {
    const { email, password } = loginAuthDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException(' 이메일이 일치하지 않습니다.')
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      throw new UnauthorizedException(' 비밀번호가 일치하지 않습니다. ');
    }
    const payload:JwtPayload = { email: user.email,userId: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async getProfile(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id:userId } });
    if(!user) {
      throw new UnauthorizedException(' 유저를 찾을수 없습니다. ');
    }
    return user;
  }

  async logout(token: string): Promise<void> {
    this.tokenBlacklist.add(token);
  }

  isTokenBlacklisted(token: string): Boolean {
    return this.tokenBlacklist.has(token);
  }
}
