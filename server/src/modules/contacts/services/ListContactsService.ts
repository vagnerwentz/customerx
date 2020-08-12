import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Contact from '../infra/typeorm/entities/Contact';
import ContactsRepository from '../infra/typeorm/repositories/ContactsRepository';

class ListContactsService {
  async execute(): Promise<Contact[]> {
    const contactsRepository = getCustomRepository(ContactsRepository);

    const contacts = await contactsRepository.find();

    if (contacts.length === 0) {
      throw new AppError('The contact is empty', 204);
    }

    return contacts;
  }
}

export default ListContactsService;
