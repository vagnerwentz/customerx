import { Repository, getRepository } from 'typeorm';

import ITelephonesRepository from '@modules/telephones/repositories/ITelephonesRepository';

import ICreateTelephoneDTO from '@modules/telephones/dtos/ICreateTelephoneDTO';
import Telephone from '../entities/Telephone';

class TelephonesRepository implements ITelephonesRepository {
  private ormRepository: Repository<Telephone>;

  constructor() {
    this.ormRepository = getRepository(Telephone);
  }

  /* Find the same telephone */
  public async findTelephone(
    telephone: string,
  ): Promise<Telephone | undefined> {
    const findTelephone = await this.ormRepository.findOne({
      where: { telephone_number: telephone },
    });

    return findTelephone;
  }

  public async findAllClientsTelephone(): Promise<Telephone[]> {
    const findAllClientsAtTelephones = await this.ormRepository.find({
      where: { contact_id: null },
    });

    return findAllClientsAtTelephones;
  }

  public async createTelephoneClient({
    owner_id,
    telephone_number,
  }: ICreateTelephoneDTO): Promise<Telephone> {
    const telephone = this.ormRepository.create({
      telephone_number,
      client_id: owner_id,
    });

    await this.ormRepository.save(telephone);

    return telephone;
  }

  public async createTelephoneContact({
    owner_id,
    telephone_number,
  }: ICreateTelephoneDTO): Promise<Telephone> {
    const telephone = this.ormRepository.create({
      telephone_number,
      contact_id: owner_id,
    });

    await this.ormRepository.save(telephone);

    return telephone;
  }
}

export default TelephonesRepository;
