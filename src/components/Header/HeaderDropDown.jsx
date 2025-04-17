import { useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import "./HeaderDropdown.css";

const HeaderDropdown = ({ onClose, onNavigate }) => {
  const ref = useRef(null);
  useOutsideClick(ref, onClose);

  return (
    <div className="header-dropdown" ref={ref}>
      <div className="header-dropdown__item" onClick={() => onNavigate("/")}>블로그</div>
      <div className="header-dropdown__item" onClick={() => onNavigate("/settings")}>설정</div>
      <div className="header-dropdown__item" onClick={() => onNavigate("/logout")}>로그아웃</div>
    </div>
  );
};

export default HeaderDropdown;