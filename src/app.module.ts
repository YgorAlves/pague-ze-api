import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { Connection } from 'typeorm';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AccountsModule, ChatbotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
