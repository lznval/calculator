export interface Loan {
  amount: number;
  term: number;
  rate: number;
};

export interface Payment {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

export interface CalculatorFormProps {
  loan: Loan;
  handleChange: (e) => void;
  calculatePayments: () => void;
};

export interface ErrorMessageProps {
  message: string;
};

export interface PaymentsTableProps {
  payments: Payment[];
};