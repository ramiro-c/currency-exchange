type Currency = {
  code: string;
  name: string;
  symbol: string;
};

type Exchange = {
  rates: Record<string, number>;
  lastUpdate: string;
};
