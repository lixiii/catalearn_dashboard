export interface Transaction {
  id: String;
  hash: String;
  date: Date;
  amount: Number;
  type: String;
  remarks?: String;
  username?: String;
  additionalData?: any;
}