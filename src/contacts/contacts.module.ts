import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Contacts } from 'src/models/contacts.entity';
import { UsersModule } from 'src/users/users.module';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contacts]), AuthModule, UsersModule],
  controllers: [ContactsController],
  providers: [ContactsService]
})
export class ContactsModule {}
