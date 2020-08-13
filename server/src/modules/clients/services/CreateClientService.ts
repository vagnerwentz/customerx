import Client from '@modules/clients/infra/typeorm/entities/Client';

import AppError from '@shared/errors/AppError';

import ITelephonesRepository from '@modules/telephones/repositories/ITelephonesRepository';
import IClientsRepository from '../repositories/IClientsRepository';

interface Request {
  name: string;
  email: string;
  telephone: string;
}

class CreateClientService {
  constructor(
    private clientsRepository: IClientsRepository,
    private telephonesRepository: ITelephonesRepository,
  ) {}

  public async execute({ name, email, telephone }: Request): Promise<Client> {
    const findClientWithSameEmail = await this.clientsRepository.findEmail(
      email,
    );

    if (findClientWithSameEmail !== undefined) {
      throw new AppError('This e-mail is already used.', 400);
    }

    const findTelephone = await this.telephonesRepository.findTelephone(
      telephone,
    );

    if (findTelephone !== undefined) {
      throw new AppError(
        'This telephone number is already used and can not be the same.',
        400,
      );
    }

    const client = await this.clientsRepository.createClient({
      name,
      email,
      telephone,
    });

    await this.telephonesRepository.createTelephoneClient({
      owner_id: client.id,
      telephone_number: telephone,
    });

    return client;
  }
}

export default CreateClientService;
