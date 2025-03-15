import { useContext } from "react";
import {
  ExchangeContext,
  ExchangeContextProps,
} from "../providers/ExchangeProvider";

export const useExchange = (): ExchangeContextProps => {
  const context = useContext(ExchangeContext);

  if (!context) {
    throw new Error("useExchange must be used within a ExchangeProvider");
  }

  return context;
};
