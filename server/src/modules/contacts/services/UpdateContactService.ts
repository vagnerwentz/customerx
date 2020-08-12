import { getCustomRepository } from 'typeorm';

import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import TelephonesRepository from '@modules/telephones/infra/typeorm/repositories/TelephonesRepository';
import ContactsRepository from '@modules/contacts/infra/typeorm/repositories/ContactsRepository';
import AppError from '@shared/errors/AppError';
import Client from '@modules/clients/infra/typeorm/entities/Client';

interface Request {
  contact_id: string;
  name: string;
  email: string;
  telephone: string;
}

class UpdateContactService {
  public async execute({
    contact_id,
    name,
    email,
    telephone,
  }: Request): Promise<Contact> {
    const clientsRepository = getCustomRepository(ClientsRepository);
    const telephonesRepository = getCustomRepository(TelephonesRepository);
    const contactsRepository = getCustomRepository(ContactsRepository);
    const contact = await contactsRepository.findContact(contact_id);

    if (!contact) {
      throw new AppError('Contact not found');
    }

    const contactWithUpdatedEmail = await contactsRepository.findEmail(email);
    const checkIfEmailAlreadyExistsAtClient = await clientsRepository.findEmail(
      email,
    );

    if (checkIfEmailAlreadyExistsAtClient) {
      throw new AppError('E-mail already in use.', 400);
    }

    if (contactWithUpdatedEmail && contactWithUpdatedEmail.id !== contact_id) {
      throw new AppError('E-mail already in use.', 400);
    }

    const contactWithUpdatedTelephone = await telephonesRepository.findTelephone(
      telephone,
    );

    if (contactWithUpdatedTelephone) {
      throw new AppError('Telephone already in use.', 400);
    }

    contact.name = name;
    contact.email = email;
    contact.telephone = telephone;

    return contactsRepository.save(contact);
  }
}

export default UpdateContactService;
