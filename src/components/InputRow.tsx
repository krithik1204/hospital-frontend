import { type ChangeEvent, type FC } from "react";

interface InputRowProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const InputRow: FC<InputRowProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => (
  <div className="input-row">
    <label className="input-label">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field"
    />
  </div>
);
