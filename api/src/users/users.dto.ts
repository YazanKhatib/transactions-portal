import { Balance } from 'src/balance/balance.entity';

export class UserPayloadDto {
  username: string;

  password: string;

  balances: Balance[];
}
