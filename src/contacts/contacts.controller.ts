import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Contacts } from 'src/models/contacts.entity';
import { User } from 'src/models/user.entity';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/CreateContact.dto';
import { GetContactDto } from './dto/getContact.dto';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {

  constructor(private contactsService: ContactsService) { }

  @UseGuards(JwtAuthGuard)
  @Get('name')
  async getContactsByName(@Body() getContactDto: GetContactDto, @CurrentUser() user: User): Promise<User[]> {
    return await this.contactsService.getContactsByName(getContactDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOneContact(@Param() id: string, @CurrentUser() user: User): Promise<Contacts> {
    return await this.contactsService.getOneContact(id, user)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getContacts(@CurrentUser() user: User): Promise<Contacts[]> {
    return await this.contactsService.getContacts(user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createContact(@Body() createContactDto: CreateContactDto, @CurrentUser() user: User):Promise<Contacts> {
    return await this.contactsService.createContact(createContactDto, user)
  }

}
