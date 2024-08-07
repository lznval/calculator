import React, { FC } from "react";
import { ErrorMessageProps } from "../types";

export const Error: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <p className="error-message">{message}</p>
  )
};
