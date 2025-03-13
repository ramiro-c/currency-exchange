import Label from "../Label";
import "./style.css";
import chevron from "../../assets/chevron.svg";

type Currency = {
  code: string;
  name: string;
};

type CurrencySelectProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  currencies: Currency[];
  label: string;
};

const CurrencySelect = ({
  id,
  value,
  onChange,
  currencies,
  label,
}: CurrencySelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
    e.target.blur();
  };

  return (
    <div className="currency-select">
      <Label id={id}>{label}</Label>
      <div className="select-wrapper">
        <select id={id} value={value} onChange={handleChange}>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
        <img src={chevron} className="chevron" />
      </div>
    </div>
  );
};

export default CurrencySelect;
