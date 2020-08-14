import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

@injectable()
class ListContactsService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  async execute(): Promise<Contact[]> {
    const contacts = await this.contactsRepository.listContact();

    if (contacts.length === 0) {
      throw new AppError('The contact is empty', 204);
    }

    return contacts;
  }
}

export default ListContactsService;
