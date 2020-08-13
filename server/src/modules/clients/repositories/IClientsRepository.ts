import Client from '../infra/typeorm/entities/Client';
import ICreateClientDTO from '../dtos/ICreateClientDTO';

export default interface IClientsRepository {
  createClient(data: ICreateClientDTO): Promise<Client>;
  findEmail(email: string): Promise<Client | undefined>;
  findClient(id: string): Promise<Client | undefined>;
  deleteClient(id: string): Promise<boolean>;
  saveClient(client: Client): Promise<Client>;
  listClient(): Promise<Client[]>;
}
