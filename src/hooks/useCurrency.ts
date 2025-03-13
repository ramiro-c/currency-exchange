import { useContext } from "react";
import {
  CurrencyContext,
  CurrencyContextProps,
} from "../providers/CurrencyProvider";

// TODO: implementar CurrencyProvider cuando se hagan las pegadas a la API
export const useCurrency = (): CurrencyContextProps => {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }

  return context;
};
