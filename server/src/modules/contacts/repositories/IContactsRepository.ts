import Contact from '../infra/typeorm/entities/Contact';
import ICreateContactDTO from '../dtos/ICreateContactDTO';

export default interface IContactsRepository {
  createContact(data: ICreateContactDTO): Promise<Contact>;
  findEmail(email: string): Promise<Contact | undefined>;
  findContact(id: string): Promise<Contact | undefined>;
  deleteContact(id: string): Promise<boolean>;
  saveContact(contact: Contact): Promise<Contact>;
  listContact(): Promise<Contact[]>;
}
