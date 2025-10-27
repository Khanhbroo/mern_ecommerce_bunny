import { useRef } from "react";

const CheckboxRow = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const handleCheckInput = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = !checkboxRef.current.checked;
    }
  };

  return (
    <div className="flex items-center mb-1">
      <input
        ref={checkboxRef}
        type="checkbox"
        name={name}
        className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
      />
      <span className="text-gray-700 select-none" onClick={handleCheckInput}>
        {children}
      </span>
    </div>
  );
};

export default CheckboxRow;
