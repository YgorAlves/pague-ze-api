import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/models/account.entity';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/CreateAccount.dto';

@Injectable()
export class AccountsService {

  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>
  ){}

  async createAccount(createAccountDto: CreateAccountDto, user: User): Promise<CreateAccountDto> {

    const {name, balance, type} = createAccountDto
    
    const account = {
      name, balance, type
    }
    console.log(user)
    const newAccount = new Account()

    newAccount.name = name
    newAccount.balance = balance
    newAccount.type = type.toLocaleUpperCase()
    newAccount.user = user

    try {
      await newAccount.save()
    } catch (e) {
      console.log(e);
      throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return newAccount;


  }
}
