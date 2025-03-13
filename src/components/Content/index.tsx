import CurrencyInput from "../CurrencyInput";
import CurrencySelect from "../CurrencySelect";
import SwitchButton from "../SwitchButton";
import "./style.css";
import { useCurrency } from "../../hooks/useCurrency";
import { useCallback } from "react";

const Content = () => {
  const {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    currencies,
  } = useCurrency();

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
    amount === "" ? "0" : parseFloat(amount).toLocaleString();

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
            onChange={handleAmountChange}
          />
          <CurrencySelect
            id="from-currency-select"
            label="From:"
            currencies={currencies}
            value={fromCurrency.code}
            onChange={(value) => handleCurrencyChange(value, "from")}
          />
          <SwitchButton onClick={handleSwitch} />
          <CurrencySelect
            id="to-currency-select"
            label="To:"
            currencies={currencies}
            value={toCurrency.code}
            onChange={(value) => handleCurrencyChange(value, "to")}
          />
        </div>
      </div>
    </section>
  );
};

export default Content;
