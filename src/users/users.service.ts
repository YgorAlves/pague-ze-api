import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';
import { GetContactDto } from 'src/contacts/dto/getContact.dto';
import { Account } from 'src/models/account.entity';
import { User } from 'src/models/user.entity';
import { Like, Repository } from 'typeorm';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { RegisterUserResponseDto } from './dto/RegisterUserResponse.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private accountService: AccountsService
  ) { }

  async findByNames(getContactDto: GetContactDto): Promise<User[]> {
    const {name} = getContactDto

    const users = await this.userRepository.find({
      where: [
        { email: Like(`%${name}%`) },
        { username: Like(`%${name}%`) }
      ]
    })
    
    // if (!users.length) {
    //   throw new HttpException(
    //     'Nenhum usuario encontrado',
    //     HttpStatus.NOT_FOUND
    //   )
    // }

    return users
  }

  async findOne (id: string): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ["account"]
    })

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
      },
      select: ["createdAt","password", "email","id","identity","photo","updatedAt","username"]
    })

    if (!user) {
      return undefined;
    }

    return user
  }

  async getProfile(user: User): Promise<User> {
    
    const profile = await this.userRepository.findOne(user.id, {
      relations: ["account"]
    })

    
    return profile
  }

  async register(registerUser: RegisterUserDto): Promise<RegisterUserResponseDto> {

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

    const account = await this.accountService.createAccount({
      name: 'Carteira Digital',
      type: 'DIGITAL',
      balance: 0
    })

    const user = new User()

    user.email = registerUser.email
    user.username = registerUser.username
    user.password = registerUser.password
    user.identity = registerUser.identity
    user.account = account
      
    await user.save()

    const { password, ...result } = user;

    return result;

  }



}