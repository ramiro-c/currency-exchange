import switchIcon from "../../../../assets/switch-button.svg";
import "./style.css";

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
