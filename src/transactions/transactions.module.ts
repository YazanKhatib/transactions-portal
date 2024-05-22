import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { transactionsProviders } from './transactions.provider';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...transactionsProviders, TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
