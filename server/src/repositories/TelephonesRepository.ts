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
}

export default TelephonesRepository;
