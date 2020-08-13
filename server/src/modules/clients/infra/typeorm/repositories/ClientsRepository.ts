import { Repository, getRepository } from 'typeorm';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  /* Find the same email */
  public async findEmail(email: string): Promise<Client | undefined> {
    const findClient = await this.ormRepository.findOne({
      where: { email },
    });

    return findClient;
  }

  public async findClient(id: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne(id);

    return client;
  }

  public async createClient({
    name,
    email,
    telephone,
  }: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create({
      name,
      email,
      telephone,
    });

    await this.ormRepository.save(client);

    return client;
  }

  public async saveClient(client: Client): Promise<Client> {
    return this.ormRepository.save(client);
  }

  public async deleteClient(id: string): Promise<boolean> {
    const client = await this.ormRepository.delete({ id });

    const isDeleted = !!client.affected;

    return isDeleted;
  }

  public async listClient(): Promise<Client[]> {
    const clients = await this.ormRepository.find();

    return clients;
  }
}

export default ClientsRepository;
