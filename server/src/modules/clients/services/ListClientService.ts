import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';

class ListClientService {
  constructor(private clientsRepository: IClientsRepository) {}

  public async execute(): Promise<Client[]> {
    const clients = await this.clientsRepository.listClient();

    return clients;
  }
}

export default ListClientService;
