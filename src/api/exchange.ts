const API_BASE_URL = "https://api.vatcomply.com";

export const fetchExchangeRates = async (
  baseCurrency: string
): Promise<Exchange> => {
  const response = await fetch(`${API_BASE_URL}/rates?base=${baseCurrency}`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // throw new Error(`Error!`);

  const data = await response.json();

  return { rates: data.rates, lastUpdate: data.date };
};

export const fetchCurrencies = async (): Promise<
  Record<string, Pick<Currency, "name" | "symbol">>
> => {
  const response = await fetch(`${API_BASE_URL}/currencies`);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // throw new Error(`Error!`);

  return await response.json();
};
