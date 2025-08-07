import { useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const HeaderDropdown = ({ userId, onClose, onNavigate, onLogout }) => {
    const ref = useRef(null);
    useOutsideClick(ref, onClose);

    return (
        <div className="absolute top-[180%] right-[0] bg-white text-black min-w-[120px] z-[1000] overflow-hidden rounded-md border-2 border-gray-200" ref={ref}>
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