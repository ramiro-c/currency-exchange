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

const ExchangeInfo = () => {
  const { exchange, toCurrency, fromCurrency } = useExchange();

  return (
    <p className="exchange-info">
      <a
        href={getHref({
          code: fromCurrency.code,
          name: fromCurrency.name,
        })}
        target="_blank"
        rel="noopener noreferrer"
      >
        {fromCurrency.name}
      </a>{" "}
      to{" "}
      <a
        href={getHref({
          code: toCurrency.code,
          name: toCurrency.name,
        })}
        target="_blank"
        rel="noopener noreferrer"
      >
        {toCurrency.name}
      </a>{" "}
      - Last update: {formatDate(exchange.lastUpdate)}
    </p>
  );
};

export default ExchangeInfo;
