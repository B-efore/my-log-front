import { useCallback, useState } from "react";
import Header from "../components/header/Header";
import SearchList from "../components/search/SearchList";
import { getSearchHoverBtnImage } from "../util/get-images";
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
        <div className="min-h-screen bg-white">
            <Header />
            <div className="flex flex-col w-full max-w-6xl items-center mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
                <div className="flex mb-6 md:mb-8 w-full justify-center">
                    <div className="flex w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-fit px-3 md:px-4 py-2 md:py-3 round-box-border gap-3 md:gap-4 mt-4 md:mt-8 bg-white shadow-sm">
                        <img
                            className="w-6 h-6 mx-auto md:w-8 md:h-8 flex-shrink-0"
                            src={getSearchHoverBtnImage()}
                        />
                        <input
                            className="w-full border-none text-sm md:text-base outline-none bg-transparent"
                            placeholder={SEARCH_PLACEHOLDER}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full max-w-4xl">
                    <SearchList
                        users={users || []}
                        onUserClick={(userId) => navigate(`/${userId}`)}
                        message={"! 생명체 신호 없음 !"}
                    />
                    {pagination.totalPosts > 0 ? (
                        <div className="mt-6 md:mt-8">
                            <Pagination
                                pagination={pagination}
                                onPageChange={handlePageChange}
                                generatePageNumbers={generatePageNumbers}
                            />
                        </div>
                    ) : (<></>)}
                </div>
            </div>
        </div>
    );
};

export default Search;