import { getCustomRepository } from 'typeorm';

import ClientsRepository from '../repositories/ClientsRepository';
import TelephonesRepository from '../repositories/TelephonesRepository';

interface Request {
  id: string;
}

class DeleteClientService {
  public async execute({ id }: Request): Promise<void> {
    const clientsRepository = getCustomRepository(ClientsRepository);
    const telephonesRepository = getCustomRepository(TelephonesRepository);

    const client = await clientsRepository.findOne(id);

    if (!client) {
      throw Error('This client does not exists');
    }

    await clientsRepository.remove(client);
  }
}

export default DeleteClientService;
