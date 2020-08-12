import { EntityRepository, Repository } from 'typeorm';
import Contact from '../entities/Contact';

@EntityRepository(Contact)
class ContactsRepository extends Repository<Contact> {
  /* Find the same email */
  public async findEmail(email: string): Promise<Contact | null> {
    const findContact = await this.findOne({
      where: { email },
    });

    return findContact || null;
  }

  public async findContact(id: string): Promise<Contact | null> {
    const contact = await this.findOne({
      where: {
        id,
      },
    });

    return contact || null;
  }
}

export default ContactsRepository;
