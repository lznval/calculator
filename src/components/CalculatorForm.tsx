import React, { FC } from "react"
import { CalculatorFormProps } from "../types"

export const CalculatorForm: FC<CalculatorFormProps> = ({ loan, handleChange, calculatePayments }) => {
  return (
    <div className="calculator">
        <label>
          Сумма кредита:
          <input
            type="text"
            name="amount"
            value={loan.amount}
            onChange={handleChange}
            placeholder="Введите сумму"
            inputMode="numeric"
          />
        </label>
        <label>
          Срок (в годах):
          <input
            type="text"
            name="term"
            value={loan.term}
            onChange={handleChange}
            placeholder="Введите срок"
            inputMode="numeric"
          />
        </label>
        <label>
          Процентная ставка (%):
          <input
            type="text"
            name="rate"
            value={loan.rate}
            onChange={handleChange}
            placeholder="Введите ставку"
            inputMode="numeric"
          />
        </label>
        <button onClick={calculatePayments}>Рассчитать</button>
      </div>
  )
};
