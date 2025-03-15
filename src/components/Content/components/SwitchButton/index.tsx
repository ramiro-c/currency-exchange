import { useCallback } from "react";
import switchIcon from "../../../../assets/switch-button.svg";
import { useExchange } from "../../../../hooks/useExchange";
import "./style.css";

const SwitchButton = () => {
  const {
    fromCurrency,
    toCurrency,
    setFromCurrency,
    setToCurrency,
    isLoading,
  } = useExchange();

  const handleSwitch = useCallback(() => {
    if (isLoading) return;

    const newToCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(newToCurrency);
  }, [setFromCurrency, setToCurrency, fromCurrency, toCurrency, isLoading]);

  return (
    <button
      className={`switch-button ${isLoading ? "disabled" : ""}`}
      type="button"
      onClick={handleSwitch}
      disabled={isLoading}
      aria-label="Switch currencies"
    >
      <img src={switchIcon} alt="" />
    </button>
  );
};

export default SwitchButton;
