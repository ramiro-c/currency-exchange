import React, { createContext, useState, ReactNode, useMemo } from "react";

export interface CurrencyContextProps {
  currency: string;
  setCurrency: (currency: string) => void;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(
  undefined
);

// TODO: implementar CurrencyProvider cuando se hagan las pegadas a la API
const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<string>("USD");
  const value = useMemo(() => ({ currency, setCurrency }), [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyContext, CurrencyProvider };
