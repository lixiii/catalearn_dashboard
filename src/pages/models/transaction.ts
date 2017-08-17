export interface Transaction {
  id: String;
  username: String;
  date: Date;
  amount: Number;
  type: String;
  remarks?: String;
  additionalData?: any;
}