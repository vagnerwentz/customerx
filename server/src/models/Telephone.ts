import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Client from './Client';
import Contact from './Contact';

@Entity('telephones')
class Telephone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  telephone_number: string;

  @Column()
  client_id: string;

  @ManyToOne(() => Client, client => client.id)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  contact_id: string;

  @ManyToOne(() => Contact, contact => contact.id)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;
}

export default Telephone;
