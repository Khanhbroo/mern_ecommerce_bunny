import { useRef } from "react";

const RadioRow = ({
  name,
  value,
  isChecked,
  onChange,
  children,
}: {
  name: string;
  value?: string;
  isChecked: boolean;
  onChange?: (element: HTMLInputElement) => void;
  children: React.ReactNode;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCheckInput = () => {
    if (inputRef.current) {
      inputRef.current.checked = true;
      onChange?.(inputRef.current);
    }
  };

  return (
    <div className="flex items-center mb-1">
      <input
        ref={inputRef}
        type="radio"
        value={value}
        name={name}
        checked={isChecked}
        className="mr-2 w-4 h-4 text-blue-500 border-gray-300 focus:ring-0 focus:outline-none"
        onChange={(event) => onChange?.(event.target)}
      />
      <span className="text-gray-700 select-none" onClick={handleCheckInput}>
        {children}
      </span>
    </div>
  );
};

export default RadioRow;
