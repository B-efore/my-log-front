import { getDefaultImage, getNotFound, getProfileImage } from "../../util/get-images";

const SearchList = ({ users, onUserClick, message }) => {
    if (!users || users.length === 0) {
        return (
            <div className="mt-20">
                <p className="font-alien text-3xl text-green-700">{message}</p>
                <img className="w-[fit h-fit]" src={getNotFound()}/>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
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
        <div className="flex w-50vw border-b-2 border-gray-300 items-center text-left gap-6 py-3 cursor-pointer result-user-box last:border-none" onClick={handleClick}>
            <img
                className="round-box-border rounded-full profile w-[4rem] h-[4rem]"
                src={getProfileImage(user.imageKey)}
            />
            <span className="flex-4 font-default-bold whitespace-nowrap overflow-hidden text-ellipsis">{user.username}</span>
            <strong className="flex-8 whitespace-nowrap overflow-hidden text-ellipsis">{user.bio}</strong>
        </div>
    );
};

export default SearchList;