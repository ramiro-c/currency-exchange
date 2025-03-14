import "./style.css";
import switchIcon from "../../../../assets/switch-button.svg";

type SwitchButtonProps = {
  onClick: () => void;
};

const SwitchButton = ({ onClick }: SwitchButtonProps) => {
  return (
    <button
      className="switch-button"
      type="button"
      onClick={onClick}
      aria-label="Switch currencies"
    >
      <img src={switchIcon} alt="" />
    </button>
  );
};

export default SwitchButton;
