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

  public async findClientWithContacts(id: string): Promise<Client | undefined> {
    const client = await this.ormRepository.manager.query(`
    with base as (
      select distinct clients.id as client_id,
        clients.name as client_name,
        clients.email as client_email,
        clients.telephone as client_telephone,
        contacts.id as contact_id,
        contacts.name as contact_name
      from clients
        left join contacts
            on contacts.client_id = clients.id
        where clients.id = '${id}'
    ), aggregate_contacts as (
      select client_id, client_name, client_email, client_telephone,
             jsonb_agg(
               case
                 when contact_id is null then '{}'::jsonb
                 else jsonb_build_object(
                    'contact_id', contact_id, 'contact_name', contact_name
                 )
               end
             ) as contacts
        from base
       group by client_id, client_name, client_email, client_telephone
    )
    select to_jsonb(aggregate_contacts) as result
      from aggregate_contacts;
    `);

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
