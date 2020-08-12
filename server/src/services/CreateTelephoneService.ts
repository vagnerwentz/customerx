import { getCustomRepository } from 'typeorm';

import TelephonesRepository from '../repositories/TelephonesRepository';
import ClientsRepository from '../repositories/ClientsRepository';
import ContactsRepository from '../repositories/ContactsRepository';

interface Request {
  owner_id: string;
  telephone_number: string;
}

class CreateTelephoneService {
  public async execute({ owner_id, telephone_number }: Request): Promise<void> {
    const telephonesRepository = getCustomRepository(TelephonesRepository);
    const clientsRepository = getCustomRepository(ClientsRepository);
    const contactsRepository = getCustomRepository(ContactsRepository);

    const isContact = await clientsRepository.findClient(owner_id);

    const isClient = await contactsRepository.findContact(owner_id);

    const findTelephone = await telephonesRepository.findTelephone(
      telephone_number,
    );

    if (findTelephone) {
      throw Error(
        'This telephone number is already used and can not be the same.',
      );
    }

    if (isContact) {
      const telephoneContact = telephonesRepository.create({
        owner_id,
        telephone_number,
      });

      await telephonesRepository.save(telephoneContact);
    } else if (isClient) {
      const telephoneClient = telephonesRepository.create({
        owner_id,
        telephone_number,
      });

      await telephonesRepository.save(telephoneClient);
    } else if (!isContact && !isClient) {
      throw new Error("We can't found the id");
    }
  }
}

export default CreateTelephoneService;
