import { getCustomRepository } from 'typeorm';

import ContactsRepository from '../repositories/ContactsRepository';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteContactService {
  public async execute({ id }: Request): Promise<void> {
    const contactsRepository = getCustomRepository(ContactsRepository);

    const contact = await contactsRepository.findOne(id);

    if (!contact) {
      throw new AppError('This contact does not exists', 400);
    }

    await contactsRepository.remove(contact);
  }
}

export default DeleteContactService;
