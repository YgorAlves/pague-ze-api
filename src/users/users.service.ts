import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/RegisterUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async findOne (id: string): Promise<User> {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new HttpException(
        'Usuário não encontrado',
        HttpStatus.NOT_FOUND
      )
    }
    return user
  }

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

    const exists = await this.userRepository.findOne({
      where: {
        email: registerUser.email
      }
    })

    if(exists)
      throw new HttpException(
        'Este e-mail já está em uso',
        HttpStatus.CONFLICT
      )


    const user = new User()

    user.email = registerUser.email
    user.username = registerUser.username
    user.password = registerUser.password
      
    await user.save()

    const { password, ...result } = user;

    return result;

  }



}