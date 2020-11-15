import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from 'src/accounts/accounts.module';
import { AuthModule } from 'src/auth/auth.module';
import { Payments } from 'src/models/payments.entity';
import { UsersModule } from 'src/users/users.module';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payments]), AuthModule, UsersModule, AccountsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {}
