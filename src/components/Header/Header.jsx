import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiEdit3 } from 'react-icons/fi';
import { getLogoImage } from '../../util/get-images';
import { useAuth } from '../../context/AuthContext';
import HeaderDropdown from './HeaderDropDown';
import './Header.css';

const Header = ({ leftChild, rightChild }) => {

    const navigate = useNavigate();
    const goHome = () => navigate("/");
    const goLogin = () => navigate("/login");
    const goWrite = () => navigate("/write");
    const { userId, username, isLoggedIn, userImage, setLogout } = useAuth();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

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
                            <FiSearch className="icon-button" title="검색" />
                            {isLoggedIn ? (
                                <>
                                    <FiEdit3 className="icon-button" title="편집" onClick={goWrite} />
                                    <div className="profile-wrapper">
                                        <img
                                            src={userImage}
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
            {/* <div className="header-bottom">
                <div className="header-nav">
                    <nav>
                        <ul>
                            <li>홈</li>
                            <li>게시글</li>
                        </ul>
                    </nav>
                </div>
            </div> */}

        </header>
    );
}

export default Header;