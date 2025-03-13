import Label from "../Label";
import "./style.css";

type CurrencyInputProps = {
  value: string;
  onChange: (value: string) => void;
  id: string;
};

const CurrencyInput = ({ value, onChange, id }: CurrencyInputProps) => {
  return (
    <div className="currency-input">
      <Label id={id}>Amount:</Label>
      <div className="input-container">
        <span className="currency-symbol">$</span>
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter amount"
          inputMode="decimal"
          maxLength={12}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
