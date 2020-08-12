import { getRepository, getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import TelephonesRepository from '@modules/telephones/infra/typeorm/repositories/TelephonesRepository';
import Contact from '../infra/typeorm/entities/Contact';

interface Request {
  name: string;
  email: string;
  telephone: string;
  client_id: string;
}

class CreateContactService {
  async execute({
    name,
    email,
    telephone,
    client_id,
  }: Request): Promise<Contact> {
    const contactsRepository = getRepository(Contact);
    const clientsRepository = getCustomRepository(ClientsRepository);
    const telephonesRepository = getCustomRepository(TelephonesRepository);

    const checkClientExists = await clientsRepository.findClient(client_id);
    const checkEmailClientEqualContact = await clientsRepository.findEmail(
      email,
    );

    const telephoneExists = await telephonesRepository.findTelephone(telephone);

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

    const checkContactExists = await contactsRepository.findOne({
      where: { email },
    });

    if (checkContactExists) {
      throw new AppError('Email address already used.', 400);
    }

    const contact = contactsRepository.create({
      name,
      email,
      telephone,
      client_id,
    });

    await contactsRepository.save(contact);

    const telephoneNumber = telephonesRepository.create({
      telephone_number: telephone,
      contact_id: contact.id,
    });

    await telephonesRepository.save(telephoneNumber);

    return contact;
  }
}

export default CreateContactService;
