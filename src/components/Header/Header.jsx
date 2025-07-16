import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDefaultImage, getNotificationIcon } from "../../util/get-images";
import { getLogoImage, getSearchHoverBtnImage, getWriteBtnImage } from '../../util/get-images';
import { useAuth } from '../../context/AuthContext';
import HeaderDropdown from './HeaderDropDown';
import { countUnreadNotification, getNotifications, updateNotificationRead } from '../../api/notificationService';
import NotificationDropdown from './NotificationDropdown';

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

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || defaultTab;

    const [notificationCount, setNotificationCount] = useState(0);

    const [loadingPages, setLoadingPages] = useState(new Set());
    const [notifications, setNotifications] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        size: 10,
        totalPages: 1,
        totalPosts: 0,
    });

    useEffect(() => {
        if (isLoggedIn) {
            fetchNotificationCount();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isNotificationOpen && notifications.length === 0) {
            loadNotifications(0);
        }
    }, [isNotificationOpen]);

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

    const fetchNotificationCount = async () => {
        try {
            const res = await countUnreadNotification();
            setNotificationCount(res.data.unreadCount);
        } catch (err) {
            console.log(err);
        }
    }

    const handleNotificationClick = () => {
        if (!isNotificationOpen) {
            setNotificationCount(0);
        }
        setIsNotificationOpen(true);
    }

    const loadNotifications = async (page) => {

        if (loadingPages.has(page)) return;

        try {
            const res = await getNotifications(page);
            setNotifications(prev => [...prev, ...res.data.objects]);
            setPagination({
                currentPage: res.data.page,
                size: res.data.size,
                totalPages: res.data.totalPages,
                totalPosts: res.data.totalElements
            });
            await updateNotificationRead();

            setLoadingPages(prev => new Set(prev).add(page));
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <header className="select-none flex flex-col w-full fixed top-0 left-0 right-0 z-[999] shadow bg-default-ligh">
            <div className="flex h-14 px-7 items-center justify-between bg-white">
                <div className="flex items-center gap-3 md:gap-4 cursor-pointer" onClick={goHome}>
                    <img className="icon-btn w-7 h-7 md:w-8 md:h-8" src={getLogoImage()} />
                    <strong className="font-default-bold text-sm break-words">{username}</strong>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    {rightChild ? rightChild : (
                        <>
                            <img
                                className="icon-btn w-7 h-7 md:w-8 md:h-8"
                                src={getSearchHoverBtnImage()}
                                alt="관찰하다"
                                onClick={goSearch}
                            />
                            {isLoggedIn ? (
                                <>
                                    <img
                                        className="icon-btn w-7 h-7 md:w-8 md:h-8"
                                        src={getWriteBtnImage()}
                                        alt="쏘다"
                                        onClick={goWrite}
                                    />
                                    <div
                                        className="relative inline-block"
                                        onClick={handleNotificationClick}
                                    >
                                        {notificationCount > 0 && (
                                            <p className="absolute -top-1 -right-0 bg-white w-5 h-5 border-1 border-gray-200 rounded-full font-alien text-sm animate-rainbow cursor-pointer transition-opacity hover:opacity-80">{notificationCount}</p>
                                        )}
                                        <img
                                            className='w-8 h-8 md:w-9 md:h-9 cursor-pointer transition-opacity hover:opacity-80'
                                            src={getNotificationIcon()}
                                            alt="알림"
                                        />

                                        {isNotificationOpen && (
                                            <NotificationDropdown
                                                onClose={() => setIsNotificationOpen(false)}
                                                pagination={pagination}
                                                notifications={notifications}
                                                loadNotifications={loadNotifications}
                                            />
                                        )}
                                    </div>
                                    <div className="relative">
                                        <img
                                            src={userImage || getDefaultImage()}
                                            alt="profile"
                                            className="w-7 h-7 md:w-8 md:h-8 aspect-square rounded-full border-2 border-gray-300 cursor-pointer"
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
                                    className="btn-primary text-sm px-3 md:px-5 py-1.5"
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
                        <ul className="flex px-4 md:px-7 m-0 whitespace-nowrap">
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