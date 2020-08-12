import { getCustomRepository } from 'typeorm';

import Contact from '../models/Contact';
import AppError from '../errors/AppError';
import ContactsRepository from '../repositories/ContactsRepository';

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
