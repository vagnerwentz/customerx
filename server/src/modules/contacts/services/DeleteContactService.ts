import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IContactsRepository from '../repositories/IContactsRepository';

interface Request {
  id: string;
}

@injectable()
class DeleteContactService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const contact = await this.contactsRepository.findContact(id);

    if (!contact) {
      throw new AppError('This contact does not exists', 400);
    }

    await this.contactsRepository.deleteContact(contact.id);
  }
}

export default DeleteContactService;
