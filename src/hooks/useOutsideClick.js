import { useEffect } from "react";

export const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
  
    const timeout = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);
  
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, handler]);
};