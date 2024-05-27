import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Transaction } from './transactions.entity';
import { Repository } from 'typeorm';
import { TransactionPayloadDto } from './transactions.dto';
import { User } from 'src/users/users.entity';
import { Balance } from 'src/balance/balance.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: Repository<Transaction>,
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('BALANCE_REPOSITORY')
    private balanceRepository: Repository<Balance>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async create({
    type,
    coin,
    amount,
    address,
    username,
  }: TransactionPayloadDto): Promise<Transaction> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['balances'],
    });

    const record = user.balances.find((balance) => balance.coin === coin);
    // Coin not found case
    if (!record) {
      throw new HttpException(
        `Balance for coin ${coin} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    console.log(record);

    if (record.amount >= amount && amount > 0) {
      record.amount -= amount;
      await this.balanceRepository.save(record);

      const transaction = await this.transactionRepository.create({
        type,
        coin,
        amount,
        address,
      });

      return await this.transactionRepository.save(transaction);
    } else {
      const statusCode = HttpStatus.BAD_REQUEST;

      throw new HttpException(
        { statusCode, message: 'Balance is not sufficient' },
        statusCode,
      );
    }
  }
}
