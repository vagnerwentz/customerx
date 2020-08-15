import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import Contact from '@modules/contacts/infra/typeorm/entities/Contact';
import { Exclude } from 'class-transformer';

@Entity('telephones')
class Telephone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  telephone_number: string;

  @Column()
  @Exclude()
  client_id: string;

  @ManyToOne(() => Client, client => client.id)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  @Exclude()
  contact_id: string;

  @ManyToOne(() => Contact, contact => contact.id)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;
}

export default Telephone;
