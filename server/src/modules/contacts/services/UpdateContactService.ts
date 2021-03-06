import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Contact from '@modules/contacts/infra/typeorm/entities/Contact';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ITelephonesRepository from '@modules/telephones/repositories/ITelephonesRepository';
import IContactsRepository from '../repositories/IContactsRepository';

interface Request {
  contact_id: string;
  name: string;
  email: string;
  telephone: string;
}

@injectable()
class UpdateContactService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('TelephonesRepository')
    private telephonesRepository: ITelephonesRepository,

    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  public async execute({
    contact_id,
    name,
    email,
    telephone,
  }: Request): Promise<Contact> {
    const contact = await this.contactsRepository.findContact(contact_id);

    if (!contact) {
      throw new AppError('Contact not found');
    }

    const contactWithUpdatedEmail = await this.contactsRepository.findEmail(
      email,
    );
    const checkIfEmailAlreadyExistsAtClient = await this.clientsRepository.findEmail(
      email,
    );

    if (checkIfEmailAlreadyExistsAtClient) {
      throw new AppError('E-mail already in use.', 400);
    }

    if (contactWithUpdatedEmail && contactWithUpdatedEmail.id !== contact_id) {
      throw new AppError('E-mail already in use.', 400);
    }

    contact.name = name;
    contact.email = email;
    contact.telephone = telephone;

    return this.contactsRepository.saveContact(contact);
  }
}

export default UpdateContactService;
