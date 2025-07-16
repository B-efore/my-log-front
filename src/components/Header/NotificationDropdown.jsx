import { useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useNavigate } from "react-router-dom";

const NotificationDropdown = ({ onClose, pagination, notifications, loadNotifications }) => {

    const navigate = useNavigate();
    const ref = useRef(null);
    useOutsideClick(ref, onClose);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });
    };

    return (
        <div className="absolute right-0 top-[150%] w-80 bg-white round-box-border z-50" ref={ref}>
            <div>
                <p className="font-alien border-b border-gray-300">알림</p>
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="p-3 text-center">
                        신호 없음!
                    </div>
                ) : (
                    <>
                        {notifications.map((notification) => (
                            <div
                                key={notification.notificationId}
                                onClick={() => navigate(notification.url)}
                                className="p-3 cursor-pointer border-b border-gray-300 transition-color hover:bg-gray-50"
                            >
                                <div className="flex justify-end">
                                    <span className="text-xs text-gray-700">
                                        {formatDate(notification.createdAt)}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-left font-alien">
                                        {notification.content}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {pagination.currentPage + 1 < pagination.totalPages && (
                            <div className="font-alien text-center border-t-[1] border-gray-300 bg-green-700 text-white">
                                <button
                                    onClick={() => loadNotifications(pagination.currentPage + 1)}
                                >
                                    더보기
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default NotificationDropdown;