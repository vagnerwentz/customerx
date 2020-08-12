import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import bcrypt from 'bcryptjs';

export default class CreateAdmins implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('admins')
      .values([
        {
          id: 'bbe0743c-bb72-468e-9d14-0942c506b31f',
          email: 'admin@customer.com.br',
          password: await bcrypt.hash('admincustomer', 8),
        },
      ])
      .execute();
  }
}
