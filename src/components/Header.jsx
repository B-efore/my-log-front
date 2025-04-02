import './Header.css';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiEdit3, FiUser } from 'react-icons/fi';
import { getLogoImage, getProfileImage } from '../util/get-logo';
import { useEffect, useState } from 'react';

const Header = ({ name, leftChild, rightChild }) => {

    const navigate = useNavigate();
    const goHome = () => navigate("/");
    const [userImage, setUserImage] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const profileImage = localStorage.getItem("profileImage");
    
        if (token) {
            setUserImage(profileImage || getProfileImage());
        }
    }, []);

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
                {userImage ? (
                    <>
                    <FiEdit3 className="icon-button" title="편집" onClick={() => navigate("/write")} />
                    <img
                    src={userImage}
                    alt="profile"
                    className="profile-image"
                    onClick={() => navigate("/")}
                    />
                    </>
                ) : (
                    <button className="header-login-button" onClick={() => navigate("/login")}>로그인</button> 
                )}
            </>
        )}
        </div>
    </header>
    );
}

export default Header;