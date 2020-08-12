import { getRepository, getCustomRepository } from 'typeorm';

import Telephone from '../models/Telephone';
import Contact from '../models/Contact';
import ClientsRepository from '../repositories/ClientsRepository';
import TelephonesRepository from '../repositories/TelephonesRepository';

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
      throw new Error(
        'You can not add a contact if the telephone already is used.',
      );
    }

    /* Checking if contact email has inside client table */
    if (checkEmailClientEqualContact) {
      throw new Error('E-mail already is used.');
    }

    if (!checkClientExists) {
      throw Error('The client does not exist.');
    }

    const checkContactExists = await contactsRepository.findOne({
      where: { email },
    });

    if (checkContactExists) {
      throw new Error('Email address already used.');
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
      owner_id,
    });

    await telephonesRepository.save(telephoneNumber);

    return contact;
  }
}

export default CreateContactService;
