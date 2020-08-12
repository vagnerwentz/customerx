import { getCustomRepository } from 'typeorm';

import TelephonesRepository from '@modules/telephones/infra/typeorm/repositories/TelephonesRepository';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import ContactsRepository from '@modules/contacts/infra/typeorm/repositories/ContactsRepository';
import AppError from '@shared/errors/AppError';

interface Request {
  owner_id: string;
  telephone_number: string;
}

class CreateTelephoneService {
  public async execute({ owner_id, telephone_number }: Request): Promise<void> {
    const telephonesRepository = getCustomRepository(TelephonesRepository);
    const clientsRepository = getCustomRepository(ClientsRepository);
    const contactsRepository = getCustomRepository(ContactsRepository);

    const isClient = await clientsRepository.findClient(owner_id);

    const isContact = await contactsRepository.findContact(owner_id);

    const findTelephone = await telephonesRepository.findTelephone(
      telephone_number,
    );

    if (findTelephone) {
      throw new AppError(
        'This telephone number is already used and can not be the same.',
        400,
      );
    }

    if (isContact) {
      const telephoneContact = telephonesRepository.create({
        contact_id: owner_id,
        telephone_number,
      });

      await telephonesRepository.save(telephoneContact);
    } else if (isClient) {
      const telephoneClient = telephonesRepository.create({
        client_id: owner_id,
        telephone_number,
      });

      await telephonesRepository.save(telephoneClient);
    } else if (!isContact && !isClient) {
      throw new AppError("We can't found the id", 400);
    }
  }
}

export default CreateTelephoneService;
