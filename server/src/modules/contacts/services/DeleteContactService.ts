import AppError from '@shared/errors/AppError';
import IContactsRepository from '../repositories/IContactsRepository';

interface Request {
  id: string;
}

class DeleteContactService {
  constructor(private contactsRepository: IContactsRepository) {}

  public async execute({ id }: Request): Promise<void> {
    const contact = await this.contactsRepository.findContact(id);

    if (!contact) {
      throw new AppError('This contact does not exists', 400);
    }

    await this.contactsRepository.deleteContact(contact.id);
  }
}

export default DeleteContactService;
