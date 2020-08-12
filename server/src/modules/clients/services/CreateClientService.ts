import { getCustomRepository } from 'typeorm';

import Client from '@modules/clients/infra/typeorm/entities/Client';

import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import TelephonesRepository from '@modules/telephones/infra/typeorm/repositories/TelephonesRepository';
import AppError from '@shared/errors/AppError';

interface Request {
  name: string;
  email: string;
  telephone: string;
}

class CreateClientService {
  public async execute({ name, email, telephone }: Request): Promise<Client> {
    const clientsRepository = getCustomRepository(ClientsRepository);
    const telephonesRepository = getCustomRepository(TelephonesRepository);

    const findClientWithSameEmail = await clientsRepository.findEmail(email);

    const findTelephone = await telephonesRepository.findTelephone(telephone);

    if (findClientWithSameEmail) {
      throw new AppError('This e-mail is already used.', 400);
    }

    if (findTelephone) {
      throw new AppError(
        'This telephone number is already used and can not be the same.',
        400,
      );
    }

    const client = clientsRepository.create({
      name,
      email,
      telephone,
    });

    await clientsRepository.save(client);

    const telephoneNumber = telephonesRepository.create({
      telephone_number: telephone,
      client_id: client.id,
    });

    await telephonesRepository.save(telephoneNumber);

    return client;
  }
}

export default CreateClientService;
