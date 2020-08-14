import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITelephonesRepository from '@modules/telephones/repositories/ITelephonesRepository';
import Telephone from '../infra/typeorm/entities/Telephone';

interface Request {
  telephone_id: string;
  new_telephone: string;
}

@injectable()
class UpdateTelephoneContactService {
  constructor(
    @inject('TelephonesRepository')
    private telephonesRepository: ITelephonesRepository,
  ) {}

  public async execute({
    telephone_id,
    new_telephone,
  }: Request): Promise<Telephone | undefined> {
    const telephoneUpdated = await this.telephonesRepository.updateContactTelephone(
      telephone_id,
      new_telephone,
    );

    if (telephoneUpdated === undefined) {
      throw new AppError('We can not updated');
    }

    const { telephone_number } = telephoneUpdated;

    if (telephone_number === new_telephone) {
      throw new AppError(
        'We can not change your number because we already have one',
        400,
      );
    }

    return telephoneUpdated;
  }
}

export default UpdateTelephoneContactService;
