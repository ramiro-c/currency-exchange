import React, { createContext, useState, ReactNode, useMemo } from "react";

export interface CurrencyContextProps {
  amount: string;
  setAmount: (amount: string) => void;
  fromCurrency: Currency;
  setFromCurrency: (fromCurrency: Currency) => void;
  toCurrency: Currency;
  setToCurrency: (toCurrency: Currency) => void;
  currencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(
  undefined
);

const currencies = [
  {
    code: "EUR",
    name: "Euros",
  },
  {
    code: "USD",
    name: "US Dollars",
  },
];

// TODO: implementar CurrencyProvider cuando se hagan las pegadas a la API
const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);

  const value = useMemo(
    () => ({
      amount,
      setAmount,
      fromCurrency,
      setFromCurrency,
      toCurrency,
      setToCurrency,
      currencies,
    }),
    [amount, fromCurrency, toCurrency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyContext, CurrencyProvider };
