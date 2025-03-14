import { useEffect, useRef, useState } from "react";
import chevron from "../../../../assets/chevron.svg";
import Label from "../Label";
import "./style.css";

type CurrencySelectProps = {
  id: string;
  selectedCurrency: Currency;
  onChange: (value: string) => void;
  currencies: Currency[];
  label: string;
};

/**
 * Custom select based on https://blog.logrocket.com/creating-custom-select-dropdown-css/ + PPI select
 */
const CurrencySelect = ({
  id,
  selectedCurrency,
  onChange,
  currencies,
  label,
}: CurrencySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (currencyCode: string) => {
    if (selectedCurrency.code === currencyCode) {
      return;
    }
    onChange(currencyCode);
    setIsOpen(false);
  };

  return (
    <div className="currency-select">
      <Label id={id}>{label}</Label>

      <div className="custom-select" ref={dropdownRef}>
        <button
          id={`dropdown-button-${id}`}
          className="select-button"
          role="combobox"
          aria-label="select button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={`select-dropdown-${id}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="selected-value">{selectedCurrency.name}</span>
          <img src={chevron} className="chevron" />
        </button>

        <ul
          className={`select-dropdown ${isOpen ? "" : "hidden"}`}
          role="listbox"
          id={`select-dropdown-${id}`}
          aria-labelledby={`dropdown-button-${id}`}
        >
          {currencies.map((currency) => (
            <li
              role="option"
              key={currency.code}
              className={
                currency.code === selectedCurrency.code ? "selected" : ""
              }
              aria-selected={currency.code === selectedCurrency.code}
              onClick={() => handleChange(currency.code)}
            >
              {currency.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CurrencySelect;
