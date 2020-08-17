import Telephone from '../infra/typeorm/entities/Telephone';
import ICreateTelephoneDTO from '../dtos/ICreateTelephoneDTO';

export default interface ITelephonesRepository {
  createTelephoneContact(data: ICreateTelephoneDTO): Promise<Telephone>;
  getAllTelephones(owner_id: string): Promise<Telephone[] | undefined>;
  createTelephoneClient(data: ICreateTelephoneDTO): Promise<Telephone>;
  findTelephone(telephone: string): Promise<Telephone | undefined>;
  findAllClientsTelephone(): Promise<Telephone[]>;
  deleteTelephone(telephone_number: string): Promise<boolean>;
  updateClientTelephone(
    telephone_id: string,
    new_telephone: string,
  ): Promise<Telephone | undefined>;
  updateContactTelephone(
    telephone_id: string,
    new_telephone: string,
  ): Promise<Telephone | undefined>;
}
