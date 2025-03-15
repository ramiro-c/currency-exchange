import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import { fetchCurrencies, fetchExchangeRates } from "../api/exchange";

export interface ExchangeContextProps {
  amount: string;
  setAmount: (amount: string) => void;
  fromCurrency: Currency;
  setFromCurrency: (fromCurrency: Currency) => void;
  toCurrency: Currency;
  setToCurrency: (toCurrency: Currency) => void;
  currencies: Currency[];
  exchange: Exchange;
  isLoading: boolean;
}

const ExchangeContext = createContext<ExchangeContextProps | undefined>(
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

const ExchangeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState(localCurrencies[0]);
  const [toCurrency, setToCurrency] = useState(localCurrencies[1]);
  const [currencies, setCurrencies] = useState<Currency[]>(localCurrencies);

  const [exchange, setExchange] = useState<Exchange>({
    rates: {},
    lastUpdate: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const loadAllCurrencies = async () => {
    try {
      const currenciesData = await fetchCurrencies();

      // no le hago un sort ya que la api parece devolverlo del más al menos común
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
    }
  };

  const fetchRates = async () => {
    setIsLoading(true);

    try {
      const { rates, lastUpdate } = await fetchExchangeRates(fromCurrency.code);

      setExchange({ rates, lastUpdate });
    } catch (error) {
      console.error("Error fetching rates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllCurrencies();
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fromCurrency.code]);

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
      exchange,
    }),
    [amount, fromCurrency, toCurrency, currencies, isLoading, exchange]
  );

  return (
    <ExchangeContext.Provider value={value}>
      {children}
    </ExchangeContext.Provider>
  );
};

export { ExchangeContext, ExchangeProvider };
