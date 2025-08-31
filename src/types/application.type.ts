export type AppType = {
  id: string;
  first_name: string;
  last_name: string;
  loan_amount: number;
  email: string;
  company: string;
  date_created: string;
  expiry_date: string;
  avatar: string;
  loan_history: LoanHistory[];
};

export interface LoanHistory {
  loan_started: string;
  loan_ended: string;
  principle: number;
  interest_rate: number;
  interest: number;
}
