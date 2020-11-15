import { Injectable } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/models/user.entity';
import { ReportSpendingDto } from './dto/ReportSpending.dto';
import { AccountsService } from 'src/accounts/accounts.service';
import { PaymentsService } from 'src/payments/payments.service';
import { FinancialmanagerService } from 'src/financialmanager/financialmanager.service';


@Injectable()
export class ReportmanagerService {
    constructor(
        private accountsService: AccountsService,
        private paymentsService: PaymentsService,
        private financialmanagerService: FinancialmanagerService
    ) {}

    async spending(reportspendingDto: ReportSpendingDto, user: User): Promise<any> {
        const { month } = reportspendingDto
        return {
            myMoney: user.account.balance,
            receipts: await this.financialmanagerService.receipts(month, user),
            transfer: 0,
            payment: 0
        }
    }
}
