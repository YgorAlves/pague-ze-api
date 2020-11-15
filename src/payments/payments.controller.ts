import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/models/user.entity';
import { PaymentsService } from './payments.service';
import {DepositWalletDto} from './dto/DepositWallet.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) { }

  randomInt(min, max) {
    return  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min) )
  }

  @Post('loterica')
  async generateLotericaCode(@Body() depositWalletDto: DepositWalletDto, @CurrentUser() user: User): Promise<any> {
    const code = [this.randomInt(100,999),' ',this.randomInt(100,999),' ', this.randomInt(10, 99)].join()
    
    await this.paymentsService.depositWallet(depositWalletDto, user)

    return { identity: user.identity, code: code.replace(/,/g, '') }
  }

  @Post('loterica')
  async generateBoleto(@Body() depositWalletDto: DepositWalletDto, @CurrentUser() user: User): Promise<any> {
    const code = [this.randomInt(100,999),' ',this.randomInt(100,999),' ', this.randomInt(10, 99)].join()
    
    await this.paymentsService.depositWallet(depositWalletDto, user)

    return { identity: user.identity, code: code.replace(/,/g, '') }
  }



  // @Post('deposit')
  // async depositWallet(@Body() depositWalletDto: DepositWalletDto, @CurrentUser() user: User): Promise<any> {

  //   return await this.paymentsService.depositWallet(depositWalletDto,user);
  // }
  
}
