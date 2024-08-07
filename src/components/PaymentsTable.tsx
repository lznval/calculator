import React, { FC } from "react";
import { PaymentsTableProps } from "../types";

export const PaymentsTable: FC<PaymentsTableProps> = ({ payments }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Месяц</th>
          <th>Платеж</th>
          <th>Основной долг</th>
          <th>Проценты</th>
          <th>Остаток долга</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment) => (
          <tr key={payment.month}>
            <td>{payment.month}</td>
            <td>{payment.payment.toFixed(2)}</td>
            <td>{payment.principal.toFixed(2)}</td>
            <td>{payment.interest.toFixed(2)}</td>
            <td>{payment.balance.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};
