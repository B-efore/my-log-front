import { getDefaultImage, getNotFound, getProfileImage } from "../../util/get-images";

const SearchList = ({ users, onUserClick, message }) => {
    if (!users || users.length === 0) {
        return (
            <div className="mt-12 md:mt-20 flex flex-col items-center text-center">
                <p className="font-alien text-xl sm:text-2xl md:text-3xl text-green-700 mb-4">{message}</p>
                <img className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" src={getNotFound()} />
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full mx-auto">
            {users.map((user) => (
                <SearchResult
                    key={user.userId}
                    user={user}
                    onUserClick={onUserClick}
                />
            ))}
        </div>
    );
};

const SearchResult = ({ user, onUserClick }) => {

    const handleClick = () => {
        onUserClick(user.userId);
    };

    return (
        <div className="flex w-full border-b-2 border-gray-300 items-center text-left gap-3 sm:gap-4 md:gap-6 py-3 md:py-4 cursor-pointer result-user-box last:border-none hover:bg-gray-50 transition-colors" onClick={handleClick}>
            <img
                className="round-box-border rounded-full profile w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0"
                src={getProfileImage(user.imageKey)}
            />
            <div className="flex flex-col sm:flex-row sm:items-center flex-1 min-w-0 gap-1 sm:gap-4">
                <span className="font-default-bold text-sm sm:text-base truncate sm:flex-shrink-0 sm:min-w-0 sm:max-w-32 md:max-w-40">{user.username}</span>
                <strong className="text-xs sm:text-sm text-gray-600 truncate flex-1">{user.bio}</strong>
            </div>
        </div>
    );
};

export default SearchList;