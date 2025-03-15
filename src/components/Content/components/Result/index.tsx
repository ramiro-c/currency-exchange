import { useMemo } from "react";
import { useExchange } from "../../../../hooks/useExchange";
import errorIcon from "../../../../assets/error.svg";

import "./style.css";

type ResultProps = {
  localeAmount: string;
};

const Result = ({ localeAmount }: ResultProps) => {
  const { amount, fromCurrency, toCurrency, exchange, error } = useExchange();

  const converted = useMemo(() => {
    if (exchange.rates && toCurrency) {
      const numericAmount = parseFloat(amount) || 0;
      const rate = exchange.rates[toCurrency.code] || 0;

      const result = Number((numericAmount * rate).toFixed(2)).toLocaleString();

      return result;
    }
  }, [amount, fromCurrency, toCurrency, exchange.rates]);

  return (
    <div className="first-column">
      {error ? (
        <div className="error-container">
          <p>Error fetching data, try again!</p>
          <img src={errorIcon} alt="" className="error-icon" />
        </div>
      ) : (
        <>
          <p className="converted-amount">
            {localeAmount} {fromCurrency.name} =<br />
            {converted} {toCurrency.name}
          </p>
          <p className="exchange-rate">
            1 {fromCurrency.code} = {exchange.rates[toCurrency.code]}{" "}
            {toCurrency.code}
          </p>
        </>
      )}
    </div>
  );
};

export default Result;
