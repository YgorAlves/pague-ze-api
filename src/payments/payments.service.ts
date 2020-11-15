import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';
import { Payments } from 'src/models/payments.entity';
import { User } from 'src/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { DepositWalletDto } from './dto/DepositWallet.dto';
import { PayContactDto } from './dto/PayContact.dto';

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

  async payContact(payContactDto: PayContactDto, user: User): Promise<any> {

    //ver se o usuario tem saldo suficiente
    let currentBalance = Number(user.account.balance)
    let { amount, id, type } = payContactDto
    amount = Number(amount)

    if(id == user.id) {
      throw new HttpException(
        'Voce não pode pagar voce mesmo', HttpStatus.BAD_REQUEST
      )
    }

    if(currentBalance < amount) {
      throw new HttpException(
        'Saldo insuficiente', HttpStatus.BAD_REQUEST
      )
    }


    const recipient = await this.userService.findOne(id)
    let recipientBalance = Number(recipient.account.balance)
    recipientBalance += amount;
    recipient.account.balance = recipientBalance;
    try {
      await recipient.account.save()
    } catch (e) {
      console.log(e)
      return false;
    }

    currentBalance -= amount;
    user.account.balance = currentBalance;

    try {
      await user.account.save()
    } catch (e) {
      console.log(e)
      return false;
    }

    return true;

  }


}
