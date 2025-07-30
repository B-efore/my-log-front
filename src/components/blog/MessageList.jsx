import { useParams } from "react-router-dom";
import { getProfileImage } from "../../util/get-images";
import { useAuth } from "../../context/AuthContext";

const MessageList = ({ messages, onEdit, onDelete }) => {

    return (
        <div>
            {messages.map((message) => (
                <MessageItem
                    key={message.guestbookId}
                    message={message}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

const MessageItem = ({ message, onEdit, onDelete }) => {

    const { userId: loginUserId } = useAuth();
    const { userId: ownerId } = useParams();

    const isWriter = message.writer?.userId === loginUserId;
    const isOwner = loginUserId === Number(ownerId);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${monthNames[date.getMonth()]}.${date.getDate()}.${date.getFullYear()}`;
    };

    return (
        <article
            className="py-4 text-left border-b-2 border-gray-200 last:border-b-0"
        >
            <div className="text-sm text-black flex">
                {formatDate(message.createdAt)}
                {message.secret && <p className="ml-auto text-sm round-box-border px-2 text-gray-500 ">비밀파시</p>}
            </div>

            {message.content && (
                <p className="w-fit text-base mt-2 m-0 text-gray-800 whitespace-pre-wrap">
                    {message.secret && !(isOwner || isWriter)
                        ? "비공개 텔레파시입니다."
                        : message.content
                    }
                </p>
            )}

            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1 cursor-pointer">
                    <img
                        src={getProfileImage(message.writer?.imageKey)}
                        className="rounded-full w-5 h-5 border-gray-200 border-2"
                    />
                    <p className="text-sm text-gray-600">{message.writer?.username}</p>
                </div>


                {isWriter && (
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(message.messageId);
                            }}
                            className="text-xs text-gray-600 cursor-pointer hover:underline"
                        >
                            수정
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(message.messageId);
                            }}
                            className="text-xs text-gray-600 cursor-pointer hover:underline"
                        >
                            삭제
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
};

export default MessageList;