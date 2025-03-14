import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import { fetchCurrencies } from "../api/currency";

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

// fallback por si falla la api
const localCurrencies = [
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
  },
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
  },
] as Currency[];

// TODO: implementar CurrencyProvider cuando se hagan las pegadas a la API
const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState(localCurrencies[0]);
  const [toCurrency, setToCurrency] = useState(localCurrencies[1]);
  const [currencies, setCurrencies] = useState<Currency[]>(localCurrencies);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadAllCurrencies = async () => {
      try {
        setIsLoading(true);
        const currenciesData = await fetchCurrencies();

        // Convert to array format and sort alphabetically by name
        const currenciesArray = Object.entries(currenciesData).map(
          ([code, data]) => ({
            code,
            name: data.name,
            symbol: data.symbol,
          })
        );

        setCurrencies(currenciesArray);
      } catch (error) {
        console.error("Error loading currencies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllCurrencies();
  }, []);

  const value = useMemo(
    () => ({
      amount,
      setAmount,
      fromCurrency,
      setFromCurrency,
      toCurrency,
      setToCurrency,
      currencies,
      isLoading,
    }),
    [amount, fromCurrency, toCurrency, currencies, isLoading]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyContext, CurrencyProvider };
