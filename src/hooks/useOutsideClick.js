import React, { useEffect } from "react";

export const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
  
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};