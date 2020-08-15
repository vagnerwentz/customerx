import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Telephone from '@modules/telephones/infra/typeorm/entities/Telephone';
import Contact from '@modules/contacts/infra/typeorm/entities/Contact';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @OneToMany(() => Telephone, telephone => telephone.client, {
    eager: true,
  })
  @JoinColumn({ name: 'telephone_number' })
  telephone_array: Telephone[];

  @OneToMany(() => Contact, contact => contact.client)
  @JoinColumn({ name: 'client_id' })
  contacts_array: Contact[];

  @CreateDateColumn()
  created_at: Date;
}

export default Client;
