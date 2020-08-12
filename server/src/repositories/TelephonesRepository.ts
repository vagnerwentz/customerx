import { EntityRepository, Repository } from 'typeorm';
import Telephone from '../models/Telephone';

@EntityRepository(Telephone)
class TelephonesRepository extends Repository<Telephone> {
  /* Find the same telephone */
  public async findTelephone(telephone: string): Promise<Telephone | null> {
    const findTelephone = await this.findOne({
      where: { telephone_number: telephone },
    });

    return findTelephone || null;
  }

  public async findAllClientsTelephone(): Promise<Telephone[]> {
    const findAllClientsAtTelephones = await this.find({
      where: { contact_id: null },
    });

    return findAllClientsAtTelephones;
  }
}

export default TelephonesRepository;
