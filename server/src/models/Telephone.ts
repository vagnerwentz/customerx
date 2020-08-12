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

  @ManyToOne(() => Client, client => client.id)
  @ManyToOne(() => Contact, contact => contact.id)
  @JoinColumn({ name: 'owner_id' })
  owner_id: string;
}

export default Telephone;
