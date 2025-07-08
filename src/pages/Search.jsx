import { useCallback, useState } from "react";
import Header from "../components/header/Header";
import SearchList from "../components/search/SearchList";
import { getSearchHoverBtnImage } from "../util/get-images";
import './Search.css'
import { searchWithUsername } from "../api/userService";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";

const SEARCH_PLACEHOLDER = "생명체를 탐색하다.";

const Search = () => {

    const [username, setUsername] = useState("");
    const [users, setUsers] = useState([]);
    const { pagination, updatePagination, handlePageChange, generatePageNumbers } = usePagination();

    const navigate = useNavigate();

    const handleSearch = useCallback(async () => {
        try {
            const res = await searchWithUsername(username, 0, 10);
            setUsers(res.data.users);
            updatePagination(res.data);
        } catch (err) {
            console.log(err);
        }
    }, [username]);

    const handleKeyDown = (e) => {
        if (!username.trim()) return;

        if (e.key === "Enter") {
            handleSearch();
        }
    }

    return (
        <div className="search-root">
            <Header />
            <div className="search-container">
                <div className="search-bar-box">
                    <div className="search-bar-t">
                        <img
                            className="search-bar-icon"
                            src={getSearchHoverBtnImage()}
                        />
                        <input
                            className="search-bar-input"
                            placeholder={SEARCH_PLACEHOLDER}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
                <div className="search-result-box">
                    <SearchList
                        users={users || []}
                        onUserClick={(userId) => navigate(`/${userId}`)}
                        message={"! 생명체 신호 없음 !"}
                    />
                    {pagination.totalPosts > 0 ? (
                        <Pagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                            generatePageNumbers={generatePageNumbers}
                        />
                    ) : (<></>)}
                </div>
            </div>
        </div>
    );
};

export default Search;