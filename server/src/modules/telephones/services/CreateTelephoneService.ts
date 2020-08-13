import AppError from '@shared/errors/AppError';

/* Interface */
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ITelephonesRepository from '../repositories/ITelephonesRepository';

interface IRequest {
  owner_id: string;
  telephone_number: string;
}

class CreateTelephoneService {
  constructor(
    private telephonesRepository: ITelephonesRepository,
    private clientsRepository: IClientsRepository,
    private contactsRepository: IContactsRepository,
  ) {}

  public async execute({
    owner_id,
    telephone_number,
  }: IRequest): Promise<void> {
    const isClient = await this.clientsRepository.findClient(owner_id);

    const isContact = await this.contactsRepository.findContact(owner_id);

    const findTelephone = await this.telephonesRepository.findTelephone(
      telephone_number,
    );

    if (findTelephone) {
      throw new AppError(
        'This telephone number is already used and can not be the same.',
        400,
      );
    }

    if (isContact) {
      await this.telephonesRepository.createTelephoneContact({
        owner_id,
        telephone_number,
      });
    } else if (isClient) {
      await this.telephonesRepository.createTelephoneClient({
        owner_id,
        telephone_number,
      });
    } else if (!isContact && !isClient) {
      throw new AppError("We can't found the id", 400);
    }
  }
}

export default CreateTelephoneService;
