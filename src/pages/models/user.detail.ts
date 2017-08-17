import { Transaction } from './transaction';

export interface UserDetail {
  credit: Number;
  email: String;
  type: String;
  username: String;
  authorisedHash?: String;
  transactions: Array<Transaction>;
}
