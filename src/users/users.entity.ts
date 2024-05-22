import { Balance } from 'src/balance/balance.entity';
import { Transaction } from 'src/transactions/transactions.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Balance)
  @JoinColumn()
  balance: Balance;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
