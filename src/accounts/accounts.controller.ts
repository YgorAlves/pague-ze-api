import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/models/user.entity';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/CreateAccount.dto';

@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {

  constructor(private accountsService: AccountsService) { }


}
