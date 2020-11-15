import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contacts } from 'src/models/contacts.entity';
import { User } from 'src/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/CreateContact.dto';

@Injectable()
export class ContactsService {

  constructor(@InjectRepository(Contacts) private contactsRepository: Repository<Contacts>,
  private usersService: UsersService) { }

  async getOneContact(id: string, user: User): Promise<Contacts> {
    const contact = await this.contactsRepository.findOne({
      where: {
        contact: id,
        user: user
      },
      relations: ["contact"]
    })

    if(!contact) {
      throw new HttpException(
        'Contato não encontrado',
        HttpStatus.BAD_REQUEST
      )
    }

    return contact
  }

  async getContacts(user: User): Promise<Contacts[]> {

    const contacts = await this.contactsRepository.find({
      where: {
        user: user
      },
      relations: ["contact"]
    })

    if(!contacts.length) {
      throw new HttpException(
        'Voce ainda não possui contatos :(',
        HttpStatus.BAD_REQUEST
      )
    }

    return contacts
  }

  async createContact(createContactDto: CreateContactDto, user: User): Promise<Contacts> {
    const { id }= createContactDto

    if(id == user.id) {
      throw new HttpException(
        'Voce não pode adicionar voce mesmo',
        HttpStatus.BAD_REQUEST
      )
    }

    const alreadyHasContact = await this.contactsRepository.findOne({
      where: {
        contact: id,
        user: user
      }
    })

    if(alreadyHasContact) {
      throw new HttpException(
        'Contato já cadastrado',
        HttpStatus.BAD_REQUEST
      )
    }
    
    const contactIsValid = await this.usersService.findOne(id)

    const contact = new Contacts()

    contact.contact = contactIsValid
    contact.user = user;

    await contact.save()

    return contact
  }

}
