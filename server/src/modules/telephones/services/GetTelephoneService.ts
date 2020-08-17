import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

/* Interface */
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ITelephonesRepository from '../repositories/ITelephonesRepository';
import Telephone from '../infra/typeorm/entities/Telephone';

interface IRequest {
  id: string;
}

@injectable()
class GetTelephoneService {
  constructor(
    @inject('TelephonesRepository')
    private telephonesRepository: ITelephonesRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Telephone[] | undefined> {
    const isContact = await this.contactsRepository.findContact(id);

    if (isContact !== undefined) {
      const telephones = await this.telephonesRepository.getAllTelephones(id);
      return telephones;
    }

    const isClient = await this.clientsRepository.findClient(id);

    if (isClient !== undefined) {
      const telephones = await this.telephonesRepository.getAllTelephones(id);
      return telephones;
    }
    if (!isContact && !isClient) {
      throw new AppError("We can't found the id", 400);
    }

    return undefined;
  }
}

export default GetTelephoneService;
