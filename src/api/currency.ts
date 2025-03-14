const API_BASE_URL = "https://api.vatcomply.com";

export const fetchExchangeRates = async (
  baseCurrency: string
): Promise<Record<string, number>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/rates?base=${baseCurrency}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};

export const fetchCurrencies = async (): Promise<
  Record<string, { name: string }>
> => {
  try {
    const response = await fetch(`${API_BASE_URL}/currencies`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching currencies:", error);
    throw error;
  }
};
