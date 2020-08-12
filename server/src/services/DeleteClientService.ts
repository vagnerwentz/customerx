import { getCustomRepository } from 'typeorm';

import ClientsRepository from '../repositories/ClientsRepository';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteClientService {
  public async execute({ id }: Request): Promise<void> {
    const clientsRepository = getCustomRepository(ClientsRepository);

    const client = await clientsRepository.findOne(id);

    if (!client) {
      throw new AppError('This client does not exists', 400);
    }

    await clientsRepository.remove(client);
  }
}

export default DeleteClientService;
