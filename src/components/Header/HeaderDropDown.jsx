import { useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const HeaderDropdown = ({ userId, onClose, onNavigate, onLogout }) => {
    const ref = useRef(null);
    useOutsideClick(ref, onClose);

    return (
        <div className="absolute top-[180%] right-[0] bg-gray-50 text-black min-w-[120px] z-[1000] overflow-hidden border border-gray-50" ref={ref}>
            <div className="dropdown-item" onClick={() => onNavigate(`/${userId}`)}>내 고향</div>
            <div className="dropdown-item" onClick={() => onNavigate("/statistic")}>보고서</div>
            <div className="dropdown-item" onClick={() => onNavigate("/settings")}>프로필</div>
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