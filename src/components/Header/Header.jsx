import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDefaultImage } from "../../util/get-images";
import { getLogoImage, getSearchHoverBtnImage, getWriteBtnImage } from '../../util/get-images';
import { useAuth } from '../../context/AuthContext';
import HeaderDropdown from './HeaderDropDown';

const Header = ({
    leftChild,
    rightChild,
    showTabs = false,
    tabs = [],
    defaultTab = 'home'
}) => {

    const navigate = useNavigate();
    const goHome = () => navigate("/");
    const goLogin = () => navigate("/login");
    const goSearch = () => navigate("/search");
    const goWrite = () => navigate("/write");
    const { userId, username, isLoggedIn, userImage, setLogout } = useAuth();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || defaultTab;

    const handleTabChange = (tabName) => {
        if (tabName === defaultTab) {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('tab');
            setSearchParams(newParams);
        } else {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('tab', tabName);
            setSearchParams(newParams);
        }
    };

    const handleLogout = () => {
        setLogout();
        navigate("/");
        setIsDropdownOpen(false);
    };

    return (
        <header className="flex flex-col w-full fixed top-0 left-0 right-0 z-[999] shadow bg-default-ligh">
            <div className="flex h-14 px-7 items-center justify-between bg-white">
                <div className="flex items-center gap-4 cursor-pointer" onClick={goHome}>
                    <img className="icon-btn" src={getLogoImage()} />
                    <strong className="font-default-bold text-sm">{username}</strong>
                </div>

                <div className="flex items-center gap-4">
                    {rightChild ? rightChild : (
                        <>
                            <img
                                className="icon-btn"
                                src={getSearchHoverBtnImage()}
                                alt="관찰하다"
                                onClick={goSearch}
                            />
                            {isLoggedIn ? (
                                <>
                                    <img
                                        className="icon-btn"
                                        src={getWriteBtnImage()}
                                        alt="쏘다"
                                        onClick={goWrite}
                                    />
                                    <div className="relative">
                                        <img
                                            src={userImage || getDefaultImage()}
                                            alt="profile"
                                            className="w-9 aspect-square rounded-full border-2 border-gray-300 cursor-pointer"
                                            onClick={toggleDropdown}
                                        />
                                        {isDropdownOpen && (
                                            <HeaderDropdown
                                                userId={userId}
                                                onLogout={handleLogout}
                                                onClose={() => setIsDropdownOpen(false)}
                                                onNavigate={(path) => {
                                                    navigate(path);
                                                    setIsDropdownOpen(false);
                                                }}
                                            />
                                        )}
                                    </div>
                                </>
                            ) : (
                                <button
                                    className="btn-primary text-sm px-5 py-1.5"
                                    onClick={goLogin}
                                >
                                    시작하다
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {showTabs && tabs.length > 0 && (
                <div className="w-full bg-white">
                    <nav className="w-full">
                        <ul className="flex px-7 m-0">
                            {tabs.map((tab) => (
                                <li
                                    key={tab.key}
                                    className={`px-2 py-2 mr-4 text-sm border-b-3 border-green-600 transition-all cursor-pointer ${activeTab === tab.key
                                            ? 'text-[#24292f] font-semibold'
                                            : 'text-[#656d76] border-transparent hover:border-gray-300'
                                        }`}
                                    onClick={() => handleTabChange(tab.key)}
                                >
                                    {tab.label}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;