import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiEdit3 } from 'react-icons/fi';
import { getLogoImage } from '../../util/get-images';
import { useAuth } from '../../context/AuthContext';
import HeaderDropdown from './HeaderDropDown';
import './Header.css';

const Header = ({ name, leftChild, rightChild }) => {

    const navigate = useNavigate();
    const goHome = () => navigate("/");
    const goLogin = () => navigate("/login");
    const goWrite = () => navigate("/write");
    const { isLoggedIn, userImage, logout } = useAuth();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

    const handleLogout = () => {
        logout();
        navigate("/");
        setIsDropdownOpen(false);
      };

    return (
        <header className="header">
            <div className="header-left" onClick={goHome}>
                <img className="logo" src={getLogoImage()} />
                <span className="blog-name">{name}</span>
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
                                        className="profile-image"
                                        onClick={toggleDropdown}
                                    />
                                    {isDropdownOpen && (
                                        <HeaderDropdown
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
        </header>
    );
}

export default Header;