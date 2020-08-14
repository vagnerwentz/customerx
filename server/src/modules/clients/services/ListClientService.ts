import { injectable, inject } from 'tsyringe';
import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';

@injectable()
class ListClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(): Promise<Client[]> {
    const clients = await this.clientsRepository.listClient();

    return clients;
  }
}

export default ListClientService;
