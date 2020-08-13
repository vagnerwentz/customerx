import Telephone from '../infra/typeorm/entities/Telephone';
import ICreateTelephoneDTO from '../dtos/ICreateTelephoneDTO';

export default interface ITelephonesRepository {
  createTelephoneContact(data: ICreateTelephoneDTO): Promise<Telephone>;
  createTelephoneClient(data: ICreateTelephoneDTO): Promise<Telephone>;
  findTelephone(telephone: string): Promise<Telephone | null>;
  findAllClientsTelephone(): Promise<Telephone[]>;
}
