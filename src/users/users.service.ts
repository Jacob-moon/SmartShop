import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where : { id } });
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    return user;
  }

  async updateUser( id: number,update: { name?:string; password?: string }, ) : Promise<void>{
    const user = await this.getUserById(id);
    if(update.name) {
      user.name = update.name;
    }
    if(update.password) {
      const salt = await bcrypt.getSalt();
      user.password = await bcrypt.hash(update.password, salt);
    }
    await this.userRepository.save(user);
  }
  
  async deleteUser(id: number): Promise<void>{
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
  }
}
