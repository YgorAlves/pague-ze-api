import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';
import { AuthModule } from 'src/auth/auth.module';
import { FinancialmanagerService } from 'src/financialmanager/financialmanager.service';
import { Account } from 'src/models/account.entity';
import { FinancialManager } from 'src/models/financialmanager.entity';
import { Payments } from 'src/models/payments.entity';
import { PaymentsService } from 'src/payments/payments.service';
import { UsersModule } from 'src/users/users.module';
import { ReportmanagerController } from './reportmanager.controller';
import { ReportmanagerService } from './reportmanager.service';

@Module({
    imports: [TypeOrmModule.forFeature([FinancialManager, Payments, Account]), UsersModule, AuthModule],
    controllers: [ReportmanagerController],
    providers: [ReportmanagerService, AccountsService, PaymentsService, FinancialmanagerService]
})
export class ReportmanagerModule {}
