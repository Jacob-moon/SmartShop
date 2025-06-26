import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

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
  
  async signup(createAuthDto: CreateAuthDto):Promise<void>{
    const { email , password , name } =createAuthDto;

    const existing = await this.userRepository.findOne({ where : { email } });
    if (existing) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }
    const salt = await bcrypt.hash(password, salt);
    

  }
}
