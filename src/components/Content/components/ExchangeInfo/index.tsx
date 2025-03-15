import { useExchange } from "../../../../hooks/useExchange";
import "./style.css";

const EXTERNAL_URL = "https://www.xe.com/currency";

const getHref = ({ code, name }: Pick<Currency, "code" | "name">) =>
  `${EXTERNAL_URL}/${code.toLowerCase()}-${name
    .split(" ")
    .join("-")
    .toLowerCase()}`;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  };
  return date.toLocaleDateString("en-US", options);
};

const CurrencyLink = ({
  currency,
}: {
  currency: Pick<Currency, "code" | "name">;
}) => (
  <a href={getHref(currency)} target="_blank" rel="noopener noreferrer">
    {currency.name}
  </a>
);

const ExchangeInfo = () => {
  const { exchange, toCurrency, fromCurrency, isLoading, error } =
    useExchange();

  return (
    <div className="exchange-info">
      <p>
        <CurrencyLink currency={fromCurrency} /> to{" "}
        <CurrencyLink currency={toCurrency} /> to conversion
      </p>
      {!error && <span className="divider"></span>}
      <p className={`exchange-update-date ${error ? "error" : ""}`}>
        Last updated{" "}
        {isLoading ? "loading..." : formatDate(exchange.lastUpdate)}
      </p>
    </div>
  );
};

export default ExchangeInfo;
