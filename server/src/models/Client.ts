import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Telephone from './Telephone';

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

  @CreateDateColumn()
  created_at: Date;
}

export default Client;
