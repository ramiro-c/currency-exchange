import { useCallback } from "react";
import { useExchange } from "../../hooks/useExchange";
import useWindowResize from "../../hooks/useWindowResize";
import CurrencyInput from "./components/CurrencyInput";
import CurrencySelect from "./components/CurrencySelect";
import ExchangeInfo from "./components/ExchangeInfo";
import Result from "./components/Result";
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
  } = useExchange();

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
          <SwitchButton />
          <CurrencySelect
            id="to-currency-select"
            label="To:"
            currencies={currencies}
            selectedCurrency={toCurrency}
            onChange={(value) => handleCurrencyChange(value, "to")}
          />
        </div>

        <div className="results">
          <Result localeAmount={localeAmount} />
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
