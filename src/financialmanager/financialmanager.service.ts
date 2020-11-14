import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialManager } from 'src/models/financialmanager.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/CreateTransaction.dto';

@Injectable()
export class FinancialmanagerService {
    constructor(
        @InjectRepository(FinancialManager) private financialmanagerRepository: Repository<FinancialManager>,
        private userService: UsersService
    ){}

    async createTransation (createTransationDto:CreateTransactionDto):Promise<FinancialManager> {
        const {amount, description, type, userId} = createTransationDto
        const user = await this.userService.findOne(userId)
        const fin = new FinancialManager()
        fin.description = description
        fin.type = type
        fin.amount = amount
        fin.user = user
        await fin.save()
        console.log(fin)
        return fin
    }
}
