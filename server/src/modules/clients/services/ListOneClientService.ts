import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListOneClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Client> {
    const client = await this.clientsRepository.findClientWithContacts(id);

    if (!client) {
      throw new AppError('Sorry we can not found the client');
    }

    return client;
  }
}

export default ListOneClientService;
