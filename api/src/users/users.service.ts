import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserPayloadDto } from './users.dto';
import { Balance } from 'src/balance/balance.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('BALANCE_REPOSITORY')
    private balanceRepository: Repository<Balance>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id?: number, username?: string): Promise<User | undefined> {
    if (id)
      return this.userRepository.findOne({
        where: { id },
        relations: ['balances'],
      });
    else
      return this.userRepository.findOne({
        where: { username },
        relations: ['balances'],
      });
  }

  async create({
    username,
    password,
    balances,
  }: UserPayloadDto): Promise<User> {
    const balancesPromises = balances.map(async ({ amount, code, coin }) => {
      const b = new Balance();
      b.amount = amount;
      b.code = code;
      b.coin = coin;

      return await this.balanceRepository.save(b);
    });

    const balancesResult = await Promise.all(balancesPromises);

    const user = await this.userRepository.create({
      username,
      password,
      balances: balancesResult,
    });

    this.userRepository.save(user);

    return user;
  }
}
