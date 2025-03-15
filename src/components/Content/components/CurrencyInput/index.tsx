import { useEffect, useState } from "react";
import Label from "../Label";
import "./style.css";

type CurrencyInputProps = {
  value: string;
  onChange: (value: string) => void;
  id: string;
  symbol: string;
};

const paddingMap: Record<number, string> = {
  1: "1.5rem",
  2: "2rem",
  3: "3rem",
} as const;

const adjustIndex = (index: number) => {
  if (index <= 1) return 1;
  if (index >= 3) return 3;

  return index;
};

const CurrencyInput = ({ value, symbol, onChange, id }: CurrencyInputProps) => {
  const [paddingLeft, setPaddingLeft] = useState(paddingMap[1]);

  useEffect(() => {
    setPaddingLeft(paddingMap[adjustIndex(symbol.length)]);
  }, [symbol]);

  return (
    <div className="currency-input">
      <Label id={id}>Amount:</Label>
      <div className="input-container">
        <span className="currency-symbol">{symbol}</span>
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter amount"
          inputMode="decimal"
          maxLength={12}
          style={{ paddingLeft }}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
