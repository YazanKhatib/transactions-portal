import { DataSource } from 'typeorm';
import { User } from './users.entity';
import { Balance } from 'src/balance/balance.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'BALANCE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Balance),
    inject: ['DATA_SOURCE'],
  },
];
