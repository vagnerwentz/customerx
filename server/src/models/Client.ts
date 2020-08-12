import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @JoinColumn({ name: 'telephone_number' })
  telephone: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Client;
