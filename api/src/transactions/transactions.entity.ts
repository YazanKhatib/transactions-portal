import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  type: string;

  @Column()
  coin: string;

  @Column()
  amount: number;

  @Column()
  address: string;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
