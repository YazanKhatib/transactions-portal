import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { transactionsProviders } from './transactions.provider';
import { DatabaseModule } from 'src/db/database.module';
import { userProviders } from 'src/users/users.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...transactionsProviders, ...userProviders, TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
