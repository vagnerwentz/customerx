import { Repository } from 'typeorm';
import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ICreateContactDTO from '@modules/contacts/dtos/ICreateContactDTO';
import Contact from '../entities/Contact';

class ContactsRepository implements IContactsRepository {
  private ormRepository: Repository<Contact>;

  /* Find the same email */
  public async findEmail(email: string): Promise<Contact | null> {
    const findContact = await this.ormRepository.findOne({
      where: { email },
    });

    return findContact || null;
  }

  public async findContact(id: string): Promise<Contact | null> {
    const contact = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return contact || null;
  }

  public async createContact({
    name,
    email,
    telephone,
    client_id,
  }: ICreateContactDTO): Promise<Contact> {
    const contact = this.ormRepository.create({
      name,
      email,
      telephone,
      client_id,
    });

    await this.ormRepository.save(contact);

    return contact;
  }

  public async saveContact(contact: Contact): Promise<Contact> {
    return this.ormRepository.save(contact);
  }

  public async deleteContact(id: string): Promise<boolean> {
    const contact = await this.ormRepository.delete({ id });

    const isDeleted = !!contact.affected;

    return isDeleted;
  }

  public async listContact(): Promise<Contact[]> {
    const contacts = await this.ormRepository.find();

    return contacts;
  }
}

export default ContactsRepository;
