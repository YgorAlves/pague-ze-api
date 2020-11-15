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

  async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {

    const { name, balance, type } = createAccountDto

    const newAccount = new Account()

    newAccount.name = name
    newAccount.balance = balance
    newAccount.type = type.toLocaleUpperCase()
    // newAccount.user = user

    await newAccount.save()

    return newAccount;
  }

  

}
