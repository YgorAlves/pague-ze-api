import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FinancialManager } from 'src/models/financialmanager.entity';
import { User } from 'src/models/user.entity';
import { CreateTransactionDto } from './dto/CreateTransaction.dto';
import { GetMonthDto } from './dto/GetMonth.dto';
import { IdDto } from './dto/Id.dto';
import { FinancialmanagerService } from './financialmanager.service';

@ApiTags('Financial Manager')
@Controller('financialmanager')
export class FinancialmanagerController {
  constructor(
    private financialmanagerService: FinancialmanagerService,
  ) {

  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto, @CurrentUser() user: User): Promise<FinancialManager> {
    return await this.financialmanagerService.createTransaction(createTransactionDto, user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('month')
  async getMonth(@Body() getMonthDto: GetMonthDto, @CurrentUser() user: User): Promise<FinancialManager[]> {
    return await this.financialmanagerService.getMonth(getMonthDto, user)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  async remove(@Param() idDto: IdDto): Promise<Boolean> {
    return await this.financialmanagerService.remove(idDto)
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(@Param() idDto: IdDto, @Body() createTransactionDto: CreateTransactionDto): Promise<FinancialManager> {
    return await this.financialmanagerService.update(idDto, createTransactionDto)
  }
}

