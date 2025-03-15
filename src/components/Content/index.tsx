import { useCallback, useMemo } from "react";
import { useExchange } from "../../hooks/useExchange";
import useWindowResize from "../../hooks/useWindowResize";
import CurrencyInput from "./components/CurrencyInput";
import CurrencySelect from "./components/CurrencySelect";
import ExchangeInfo from "./components/ExchangeInfo";
import SwitchButton from "./components/SwitchButton";
import "./style.css";

const Content = () => {
  const { isMobile } = useWindowResize();
  const {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    currencies,
    exchange,
  } = useExchange();

  const handleSwitch = useCallback(() => {
    const newToCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(newToCurrency);
  }, [setFromCurrency, setToCurrency, fromCurrency, toCurrency]);

  const handleCurrencyChange = useCallback(
    (value: string, type: "from" | "to") => {
      const selectedCurrency = currencies.find(
        (currency) => currency.code === value
      );

      if (selectedCurrency) {
        if (type === "from") {
          setFromCurrency(selectedCurrency);
        } else {
          setToCurrency(selectedCurrency);
        }
      }
    },
    [currencies, setFromCurrency, setToCurrency]
  );

  const handleAmountChange = useCallback(
    (value: string) => {
      if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
        setAmount(value === "" ? "" : value);
      }
    },
    [setAmount]
  );

  const localeAmount =
    amount === "" || isNaN(Number(amount))
      ? "0"
      : parseFloat(amount).toLocaleString();

  const converted = useMemo(() => {
    if (exchange.rates && toCurrency) {
      const numericAmount = parseFloat(amount) || 0;
      const rate = exchange.rates[toCurrency.code] || 0;

      const result = Number((numericAmount * rate).toFixed(2)).toLocaleString();

      return result;
    }
  }, [amount, fromCurrency, toCurrency, exchange.rates]);

  return (
    <section className="content">
      <h2>
        {localeAmount} {fromCurrency.code} to {toCurrency.code} - Convert{" "}
        {fromCurrency.name} to {toCurrency.name}
      </h2>
      <div className="card">
        <div className="selectors">
          <CurrencyInput
            id="currency-input"
            value={amount}
            symbol={fromCurrency.symbol}
            onChange={handleAmountChange}
          />
          <CurrencySelect
            id="from-currency-select"
            label="From:"
            currencies={currencies}
            selectedCurrency={fromCurrency}
            onChange={(value) => handleCurrencyChange(value, "from")}
          />
          <SwitchButton onClick={handleSwitch} />
          <CurrencySelect
            id="to-currency-select"
            label="To:"
            currencies={currencies}
            selectedCurrency={toCurrency}
            onChange={(value) => handleCurrencyChange(value, "to")}
          />
        </div>

        <div className="results">
          <div className="first-column">
            <p className="converted-amount">
              {localeAmount} {fromCurrency.name} =<br />
              {converted} {toCurrency.name}
            </p>
            <p className="exchange-rate">
              1 {fromCurrency.code} = {exchange.rates[toCurrency.code]}{" "}
              {toCurrency.code}
            </p>
          </div>
          <div className="second-column">
            <div className="card-explanation">
              <p>
                We use the mid-market rate for our Converter. This is for
                informational purposes only. You won’t receive this rate when
                sending money.
              </p>
            </div>
            {!isMobile && <ExchangeInfo />}
          </div>
        </div>
      </div>

      {isMobile && <ExchangeInfo />}
    </section>
  );
};

export default Content;
