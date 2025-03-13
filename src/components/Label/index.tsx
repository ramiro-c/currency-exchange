import "./styles.css";

type LabelProps = {
  id: string;
  children: string;
};

const Label = ({ id, children }: LabelProps) => (
  <label className="label" htmlFor={id}>
    {children}
  </label>
);

export default Label;
