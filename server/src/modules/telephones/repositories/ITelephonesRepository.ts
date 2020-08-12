import Telephone from '../infra/typeorm/entities/Telephone';

export default interface IAppointmentsRepository {
  findTelephone(telephone: string): Promise<Telephone | null>;
  findAllClientsTelephone(): Promise<Telephone[]>;
}
