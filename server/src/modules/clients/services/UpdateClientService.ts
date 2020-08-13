import AppError from '@shared/errors/AppError';
import ITelephonesRepository from '@modules/telephones/repositories/ITelephonesRepository';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';

interface Request {
  client_id: string;
  name: string;
  email: string;
  telephone: string;
}

class UpdateClientService {
  constructor(
    private clientsRepository: IClientsRepository,
    private telephonesRepository: ITelephonesRepository,
    private contactsRepository: IContactsRepository,
  ) {}

  public async execute({
    client_id,
    name,
    email,
    telephone,
  }: Request): Promise<Client> {
    const client = await this.clientsRepository.findClient(client_id);

    if (!client) {
      throw new AppError('Client not found');
    }

    const clientWithUpdatedEmail = await this.clientsRepository.findEmail(
      email,
    );
    const checkIfEmailAlreadyExistsAtContact = await this.contactsRepository.findEmail(
      email,
    );

    if (checkIfEmailAlreadyExistsAtContact) {
      throw new AppError('E-mail already in use.', 400);
    }

    if (clientWithUpdatedEmail && clientWithUpdatedEmail.id !== client_id) {
      throw new AppError('E-mail already in use.', 400);
    }

    const clientWithUpdatedTelephone = await this.telephonesRepository.findTelephone(
      telephone,
    );

    if (clientWithUpdatedTelephone) {
      throw new AppError('Telephone already in use.', 400);
    }

    client.name = name;
    client.email = email;
    client.telephone = telephone;

    return this.clientsRepository.saveClient(client);
  }
}

export default UpdateClientService;
