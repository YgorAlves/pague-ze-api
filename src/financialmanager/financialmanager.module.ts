import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FinancialManager } from 'src/models/financialmanager.entity';
import { UsersModule } from 'src/users/users.module';
import { FinancialmanagerController } from './financialmanager.controller';
import { FinancialmanagerService } from './financialmanager.service';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialManager]), UsersModule, AuthModule],
  controllers: [FinancialmanagerController],
  providers: [FinancialmanagerService]
})
export class FinancialmanagerModule {}
