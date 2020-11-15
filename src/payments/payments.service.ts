import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';
import { Payments } from 'src/models/payments.entity';
import { User } from 'src/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { DepositWalletDto } from './dto/DepositWallet.dto';

@Injectable()
export class PaymentsService {

  constructor(
    @InjectRepository(Payments) private paymentsRepository: Repository<Payments>,
    private accountsService: AccountsService,
    private userService: UsersService
  ){}

  async depositWallet(depositWalletDto: DepositWalletDto, userDto: User): Promise<any> {
  // console.log(depositWalletDto)
  
    const user = await this.userService.findOne(userDto.id)
      let currentBalance = Number(user.account.balance);
      currentBalance += Number(depositWalletDto.amount)
      user.account.balance = currentBalance
    
    await user.account.save()

    const payment =  new Payments()
      payment.sender = userDto
      payment.recipient = userDto
      payment.type = "deposit"
      payment.status = "approved"
      payment.amount = depositWalletDto.amount
    await payment.save()


    return user.account.balance;
  }

}
