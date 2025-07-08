import { getDefaultImage, getNotFound } from "../../util/get-images";

const SearchList = ({ users, onUserClick, message }) => {
    if (!users || users.length === 0) {
        return (
            <div className="no-search-result-message">
                <p>{message}</p>
                <img src={getNotFound()}/>
            </div>
        );
    }

    return (
        <div className="search-results-user">
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
        <div className="result-user-box" onClick={handleClick}>
            <img
                className="result-user-img"
                src={getDefaultImage()}
            />
            <span className="result-user-name">{user.username}</span>
            <strong className="result-user-bio">{user.bio}</strong>
        </div>
    );
};

export default SearchList;