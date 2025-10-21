import { useEffect } from "react";

const useEscapeKey = ({
  escapeCondition,
  setEscapeCondition,
}: {
  escapeCondition: boolean;
  setEscapeCondition: (arg0: boolean) => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && escapeCondition) {
        setEscapeCondition(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [escapeCondition, setEscapeCondition]);
};

export default useEscapeKey;
