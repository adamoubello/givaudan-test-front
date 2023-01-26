export interface Customer {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
  amount: number;
}

export interface CustomerAction {
  cust: Customer;
  action: string;
}