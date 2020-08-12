import { EntityRepository, Repository } from 'typeorm';
import Client from '@modules/clients/infra/typeorm/entities/Client';

@EntityRepository(Client)
class ClientsRepository extends Repository<Client> {
  /* Find the same email */
  public async findEmail(email: string): Promise<Client | null> {
    const findClient = await this.findOne({
      where: { email },
    });

    return findClient || null;
  }

  public async findClient(id: string): Promise<Client | null> {
    const client = await this.findOne({
      where: {
        id,
      },
    });

    return client || null;
  }
}

export default ClientsRepository;
