import { Repository, getRepository } from 'typeorm';

import ITelephonesRepository from '@modules/telephones/repositories/ITelephonesRepository';

import ICreateTelephoneDTO from '@modules/telephones/dtos/ICreateTelephoneDTO';
import Telephone from '../entities/Telephone';

class TelephonesRepository implements ITelephonesRepository {
  private ormRepository: Repository<Telephone>;

  constructor() {
    this.ormRepository = getRepository(Telephone);
  }

  public async getAllTelephones(
    owner_id: string,
  ): Promise<Telephone[] | undefined> {
    const getTelephoneClient = await this.ormRepository.find({
      where: { client_id: owner_id },
    });

    const getTelephoneContact = await this.ormRepository.find({
      where: { contact_id: owner_id, client_id: null },
    });

    if (getTelephoneClient.length !== 0) {
      return getTelephoneClient;
    }

    if (getTelephoneContact.length !== 0) {
      return getTelephoneContact;
    }

    return undefined;
  }

  public async updateClientTelephone(
    telephone_id: string,
    new_telephone: string,
  ): Promise<Telephone | undefined> {
    const updatedTelephone = await this.ormRepository.findOne({
      where: { id: telephone_id },
    });

    if (updatedTelephone !== undefined) {
      updatedTelephone.telephone_number = new_telephone;

      await this.ormRepository.save(updatedTelephone);
    }

    return updatedTelephone;
  }

  public async updateContactTelephone(
    telephone_id: string,
    new_telephone: string,
  ): Promise<Telephone | undefined> {
    const updatedTelephone = await this.ormRepository.findOne({
      where: { id: telephone_id },
    });

    if (updatedTelephone !== undefined) {
      updatedTelephone.telephone_number = new_telephone;

      await this.ormRepository.save(updatedTelephone);
    }

    return updatedTelephone;
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

  public async deleteTelephone(telephone_number: string): Promise<boolean> {
    const telephone = await this.ormRepository.delete({ telephone_number });

    const isDeleted = !!telephone.affected;

    return isDeleted;
  }
}

export default TelephonesRepository;
