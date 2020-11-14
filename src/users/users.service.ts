import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async findOneByEmail(email: string): Promise<User | undefined> {
    
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    })

    if (!user) {
      return undefined;
    }

    return user
  }

  async register(any: any) {

    const user = new User()

    user.email = any.email
    user.username = any.username
    user.password = any.password
      
    await user.save()

    return user;

  }



}