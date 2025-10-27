import { useRef } from "react";

const CheckboxRow = ({
  name,
  value,
  onChange,
  isChecked,
  children,
}: {
  name: string;
  value?: string;
  isChecked: boolean;
  onChange?: (event: HTMLInputElement) => void;
  children: React.ReactNode;
}) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const handleCheckInput = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = !checkboxRef.current.checked;
      onChange?.(checkboxRef.current);
    }
  };

  return (
    <div className="flex items-center mb-1">
      <input
        ref={checkboxRef}
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
        onChange={(event) => onChange?.(event.target)}
      />
      <span className="text-gray-700 select-none" onClick={handleCheckInput}>
        {children}
      </span>
    </div>
  );
};

export default CheckboxRow;
