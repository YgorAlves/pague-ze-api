import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FinancialManager } from 'src/models/financialmanager.entity';
import { CreateTransactionDto } from './dto/CreateTransaction.dto';
import { GetMonthDto } from './dto/GetMonth.dto';
import { FinancialmanagerService } from './financialmanager.service';

@ApiTags('Financial Manager')
@Controller('financialmanager')
export class FinancialmanagerController {
  constructor(
    private financialmanagerService: FinancialmanagerService,
  ) {

  }

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto): Promise<FinancialManager> {
    return await this.financialmanagerService.createTransaction(createTransactionDto)
  }

  @Get('month')
  async getMonth(@Body() getMonthDto: GetMonthDto): Promise<FinancialManager[]> {
    return await this.financialmanagerService.getMonth(getMonthDto)
  }

  @Delete('delete')
  async delete(@Param() id: string): Promise<Boolean> {
    return await this.financialmanagerService.delete(id)
  }
}

