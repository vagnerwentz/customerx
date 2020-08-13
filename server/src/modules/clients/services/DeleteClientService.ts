import AppError from '@shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';

interface Request {
  id: string;
}

class DeleteClientService {
  constructor(private clientsRepository: IClientsRepository) {}

  public async execute({ id }: Request): Promise<void> {
    const client = await this.clientsRepository.findClient(id);

    if (!client) {
      throw new AppError('This client does not exists', 400);
    }

    await this.clientsRepository.deleteClient(client.id);
  }
}

export default DeleteClientService;
