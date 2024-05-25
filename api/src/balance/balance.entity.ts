import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  coin: string;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.balances)
  user: User;
}
