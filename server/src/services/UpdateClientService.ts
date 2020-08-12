import { getCustomRepository } from 'typeorm';

import Client from '../models/Client';

import ClientsRepository from '../repositories/ClientsRepository';
import TelephonesRepository from '../repositories/TelephonesRepository';
import ContactsRepository from '../repositories/ContactsRepository';
import AppError from '../errors/AppError';

interface Request {
  client_id: string;
  name: string;
  email: string;
  telephone: string;
}

class UpdateClientService {
  public async execute({
    client_id,
    name,
    email,
    telephone,
  }: Request): Promise<Client> {
    const clientsRepository = getCustomRepository(ClientsRepository);
    const telephonesRepository = getCustomRepository(TelephonesRepository);
    const contactsRepository = getCustomRepository(ContactsRepository);
    const client = await clientsRepository.findClient(client_id);

    if (!client) {
      throw new AppError('Client not found');
    }

    const clientWithUpdatedEmail = await clientsRepository.findEmail(email);
    const checkIfEmailAlreadyExistsAtContact = await contactsRepository.findEmail(
      email,
    );

    if (checkIfEmailAlreadyExistsAtContact) {
      throw new AppError('E-mail already in use.', 400);
    }

    if (clientWithUpdatedEmail && clientWithUpdatedEmail.id !== client_id) {
      throw new AppError('E-mail already in use.', 400);
    }

    const clientWithUpdatedTelephone = await telephonesRepository.findTelephone(
      telephone,
    );

    if (clientWithUpdatedTelephone) {
      throw new AppError('Telephone already in use.', 400);
    }

    client.name = name;
    client.email = email;
    client.telephone = telephone;

    return clientsRepository.save(client);
  }
}

export default UpdateClientService;
