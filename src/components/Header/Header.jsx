import './Header.css';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiEdit3 } from 'react-icons/fi';
import { getLogoImage } from '../../util/get-images';
import useAuth from '../../hooks/useAuth';

const Header = ({ name, leftChild, rightChild }) => {

    const navigate = useNavigate();
    const goHome = () => navigate("/");
    const goLogin = () => navigate("/login");
    const goWrite = () => navigate("/write");
    const { isLoggedIn, userImage } = useAuth();

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
                    <img
                        src={userImage}
                        alt="profile"
                        className="profile-image"
                        onClick={goHome}
                    />
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