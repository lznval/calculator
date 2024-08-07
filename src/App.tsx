import React, { useState } from "react";
import "./App.css";
import { Error } from "./components/Error.tsx";
import { CalculatorForm } from "./components/CalculatorForm.tsx";
import { PaymentsTable } from "./components/PaymentsTable.tsx";
import { Loan, Payment } from "./types";

export const App: React.FC = () => {
  const [loan, setLoan] = useState<Loan>({ amount: 0, term: 0, rate: 0 });
  const [payments, setPayments] = useState<Payment[]>([]);
  const [visiblePayments, setVisiblePayments] = useState<number>(20);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoan((prevLoan) => ({
      ...prevLoan,
      [name]: value,
    }));
  };

  const validateInputs = (): boolean => {
    const { amount, term, rate } = loan;
    return amount > 0 && term > 0 && rate > 0;
  };

  const calculatePayments = () => {
    if (!validateInputs()) {
      setError('Некорректные данные');
      setPayments([]);
      setVisiblePayments(20);
      return;
    }

    setError(null);
    const { amount, term, rate } = loan;
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;
    const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const paymentSchedule: Payment[] = [];
    let balance = amount;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      paymentSchedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(balance, 0),
      });
    }

    setPayments(paymentSchedule);
  };

  const handleShowMore = () => {
    setVisiblePayments((prevVisible) => Math.min(prevVisible + 20, payments.length));
  };

  const displayedPayments = payments.slice(0, visiblePayments);

  return (
    <div className="App">
      <h1>Кредитный калькулятор</h1>
      <CalculatorForm
        loan={loan}
        handleChange={handleChange}
        calculatePayments={calculatePayments}
      />
      {error && <Error message={error} />}
      {payments.length > 0 && !error && (
        <>
          <PaymentsTable 
            payments={displayedPayments}
          />
          {visiblePayments < payments.length && (
            <button onClick={handleShowMore}>Показать ещё</button>
          )}
        </>
      )}
    </div>
  );
};