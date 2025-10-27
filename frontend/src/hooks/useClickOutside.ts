import { useEffect } from "react";

const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  onOutsideClick: () => void,
  ignoreRef?: React.RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        ref.current &&
        !ref.current.contains(target) &&
        (!ignoreRef || !ignoreRef.current?.contains(target))
      ) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, onOutsideClick, ignoreRef]);
};

export default useClickOutside;
