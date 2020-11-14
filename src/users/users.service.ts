import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/RegisterUser.dto';

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

  async register(registerUser: RegisterUserDto) {

    const user = new User()

    user.email = registerUser.email
    user.username = registerUser.username
    user.password = registerUser.password
      
    await user.save()

    return user;

  }



}