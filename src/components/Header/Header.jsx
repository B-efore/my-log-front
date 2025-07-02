import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDefaultImage } from "../../util/get-images";
import { getLogoImage, getSearchBtnImage, getSearchHoverBtnImage, getWriteBtnImage } from '../../util/get-images';
import { useAuth } from '../../context/AuthContext';
import HeaderDropdown from './HeaderDropDown';
import './Header.css';

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
        <header className="header">
            <div className="header-bar">
                <div className="header-left" onClick={goHome}>
                    <img className="header-logo" src={getLogoImage()} />
                    <span className="header-username">{username}</span>
                </div>

                <div className="header-right">
                    {rightChild ? rightChild : (
                        <>
                            <img
                                className="icon-button"
                                src={getSearchHoverBtnImage()}
                                alt="관찰하다"
                                onClick={goSearch}
                            />
                            {isLoggedIn ? (
                                <>
                                    <img
                                        className="icon-button"
                                        src={getWriteBtnImage()}
                                        alt="쏘다"
                                        onClick={goWrite}
                                    />
                                    <div className="profile-wrapper">
                                        <img
                                            src={userImage || getDefaultImage()}
                                            alt="profile"
                                            className="header-profile-image"
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
                                <button className="header-login-button" onClick={goLogin}>로그인</button>
                            )}
                        </>
                    )}
                </div>
            </div>
            
            {showTabs && tabs.length > 0 && (
                <div className="nav-body">
                    <nav>
                        <ul className="nav-list">
                            {tabs.map((tab) => (
                                <li
                                    key={tab.key}
                                    className={activeTab === tab.key ? 'tab active' : 'tab'}
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