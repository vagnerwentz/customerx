import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Client from './Client';
import Telephone from './Telephone';

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

  @ManyToOne(() => Client, client => client.id, { eager: true })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column()
  client_id: string;
}

export default Contact;
