import { inject, injectable } from 'tsyringe';

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

    return contacts;
  }
}

export default ListContactsService;
