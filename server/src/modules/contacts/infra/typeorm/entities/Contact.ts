import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import Telephone from '@modules/telephones/infra/typeorm/entities//Telephone';

@Entity('contacts')
class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @OneToMany(() => Telephone, telephone => telephone.contact, {
    eager: true,
  })
  @JoinColumn({ name: 'telephone_number' })
  telephone_array: Telephone[];

  @ManyToOne(() => Client, client => client.id)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  client_id: string;
}

export default Contact;
