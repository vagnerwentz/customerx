import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Client from './Client';

@Entity('contacts')
class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @JoinColumn({ name: 'telephone_number' })
  telephone: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client_id: string;
}

export default Contact;
