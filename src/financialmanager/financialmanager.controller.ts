import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FinancialManager } from 'src/models/financialmanager.entity';
import { CreateTransactionDto } from './dto/CreateTransaction.dto';
import { FinancialmanagerService } from './financialmanager.service';

@Controller('financialmanager')
export class FinancialmanagerController {
    constructor (
        private financialmanagerService:FinancialmanagerService,
    ) {

    }
    
    // @UseGuards(JwtAuthGuard)
    @Post('create')
    async createTransation(@Body() createTransationDto:CreateTransactionDto):Promise<FinancialManager> {
        return await this.financialmanagerService.createTransation(createTransationDto)
    }

}

