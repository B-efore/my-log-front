import './Header.css';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiEdit3, FiUser } from 'react-icons/fi';
import { getLogoImage } from '../util/get-logo';

const Header = ({ name, leftChild, rightChild }) => {

    const navigate = useNavigate();
    const goHome = () => navigate("/");

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
                <FiEdit3 className="icon-button" title="편집" />
                <FiUser className="icon-button" title="프로필" />
            </>
        )}
        </div>
    </header>
    );
}

export default Header;