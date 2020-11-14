import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { Connection } from 'typeorm';
import { ChatbotModule } from './chatbot/chatbot.module';
import { MercadopagoModule } from './mercadopago/mercadopago.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(),
    UsersModule, AccountsModule, ChatbotModule, MercadopagoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}

//TEST-3728515336067325-111321-9ea0e85c6fe93b7574fcd288762ce52a-271547972