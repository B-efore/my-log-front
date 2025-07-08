import { useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const HeaderDropdown = ({ userId, onClose, onNavigate, onLogout }) => {
    const ref = useRef(null);
    useOutsideClick(ref, onClose);

    return (
        <div className="absolute top-[150%] right-[0] bg-white border-2 border-gray-200 shadow rounded-xl min-w-[120px] z-[1000] overflow-hidden" ref={ref}>
            <div className="dropdown-item" onClick={() => onNavigate(`/${userId}`)}>블로그</div>
            <div className="dropdown-item" onClick={() => onNavigate("/settings")}>설정</div>
            <div className="dropdown-item" onClick={() => {
                onLogout();
                onClose();
            }}>
                로그아웃
            </div>
        </div>
    );
};

export default HeaderDropdown;