import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ITelephonesRepository from '../repositories/ITelephonesRepository';

interface Request {
  owner_id: string;
  telephone_number: string;
}

@injectable()
class DeleteTelephoneService {
  constructor(
    @inject('TelephonesRepository')
    private telephonesRepository: ITelephonesRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  public async execute({ owner_id, telephone_number }: Request): Promise<void> {
    const isClient = await this.clientsRepository.findClient(owner_id);

    const isContact = await this.contactsRepository.findContact(owner_id);

    const telephoneExists = await this.telephonesRepository.findTelephone(
      telephone_number,
    );

    if (!telephoneExists) {
      throw new AppError(
        'We can not delete this number because we not found',
        400,
      );
    }

    if (isContact) {
      await this.telephonesRepository.deleteTelephone(telephone_number);
    } else if (isClient) {
      await this.telephonesRepository.deleteTelephone(telephone_number);
    } else if (!isContact && !isClient) {
      throw new AppError("We can't found the id", 400);
    }
  }
}

export default DeleteTelephoneService;
