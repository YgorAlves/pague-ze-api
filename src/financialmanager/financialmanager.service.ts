import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialManager } from 'src/models/financialmanager.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/CreateTransaction.dto';
import { GetMonthDto } from './dto/GetMonth.dto';
import { IdDto } from './dto/Id.dto';

@Injectable()
export class FinancialmanagerService {
  constructor(
    @InjectRepository(FinancialManager) private financialmanagerRepository: Repository<FinancialManager>,
    private userService: UsersService
  ) { }

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<FinancialManager> {
    const { amount, description, type, userId } = createTransactionDto;

    const user = await this.userService.findOne(userId)

    const fin = new FinancialManager()

    fin.description = description
    fin.type = type
    fin.amount = amount
    fin.user = user
    
    await fin.save()

    return fin
  }

  async getMonth (getMonthDto: GetMonthDto):Promise<FinancialManager[]> {
    const { month } = getMonthDto

    const user = 1
    const fins = this.financialmanagerRepository.createQueryBuilder()
      .where('MONTH(financialmanager.createdAt) = MONTH(:month)',{ month: month })
      .andWhere('YEAR(financialmanager.createdAt) = YEAR(:month)',{ month: month })
      .andWhere('financialmanager.userId = :userId', { userId: user})
      .getMany()
    return fins
  }

  async remove (idDto: IdDto): Promise<Boolean>{
    const { id } = idDto
    const fin = await this.findOne(id)
    return await fin.remove() ? true : false
  }

  async findOne (id: string): Promise<FinancialManager> {
    const fin = await this.financialmanagerRepository.findOne(id)
    if (!fin) {
      throw new HttpException(
        'Transação não encontrada',
        HttpStatus.NOT_FOUND
      )
    }
    return fin
  }

  async update (idDto: IdDto, createTransactionDto: CreateTransactionDto) {
    const { id } = idDto
    const { amount, description, type } = createTransactionDto;
    const fin = await this.findOne(id)
    fin.amount  = amount
    fin.description  = description
    fin.type  = type
    await fin.save()
    return fin
  }
}
