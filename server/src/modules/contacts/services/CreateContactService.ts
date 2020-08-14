import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ITelephonesRepository from '@modules/telephones/repositories/ITelephonesRepository';
import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

interface Request {
  name: string;
  email: string;
  telephone: string;
  client_id: string;
}

@injectable()
class CreateContactService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('TelephonesRepository')
    private telephonesRepository: ITelephonesRepository,
  ) {}

  async execute({
    name,
    email,
    telephone,
    client_id,
  }: Request): Promise<Contact> {
    const checkClientExists = await this.clientsRepository.findClient(
      client_id,
    );
    const checkEmailClientEqualContact = await this.clientsRepository.findEmail(
      email,
    );

    const telephoneExists = await this.telephonesRepository.findTelephone(
      telephone,
    );

    if (telephoneExists) {
      throw new AppError(
        'You can not add a contact if the telephone already is used.',
        400,
      );
    }

    /* Checking if contact email has inside client table */
    if (checkEmailClientEqualContact) {
      throw new AppError('E-mail already is used.', 400);
    }

    if (!checkClientExists) {
      throw new AppError('The client does not exist.', 400);
    }

    const checkContactEmail = await this.contactsRepository.findEmail(email);

    if (checkContactEmail) {
      throw new AppError('Email address already used.', 400);
    }

    const contact = await this.contactsRepository.createContact({
      name,
      email,
      telephone,
      client_id,
    });

    this.telephonesRepository.createTelephoneContact({
      telephone_number: telephone,
      owner_id: contact.id,
    });

    return contact;
  }
}

export default CreateContactService;
