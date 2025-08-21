import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import SearchList from "../../components/search/SearchList";
import { getSearchHoverBtnImage } from "../../util/get-images";
import { searchWithUsername } from "../../api/userService";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../../components/pagination/Pagination";

const SEARCH_PLACEHOLDER = "생명체를 탐색하다.";

const Search = () => {

    const [username, setUsername] = useState("");
    const [users, setUsers] = useState([]);
    const { pagination, updatePagination, handlePageChange, generatePageNumbers } = usePagination();

    const navigate = useNavigate();

    const handleSearch = useCallback(async () => {
        try {
            const res = await searchWithUsername(username, 0, 10);
            setUsers(res.data.objects);
            updatePagination(res.data);
        } catch (err) {
            console.error(err);
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
            <div className="flex flex-col fixed-w fixed-p responsible-w w-full items-center pt-24">
                <div className="flex w-full justify-center mb-6 md:mb-8 px-4 py-2 gap-4">
                    <input
                        className="w-full py-2 border-b-2 border-gray-300 focus:border-black bg-transparent text-lg md:text-2xl outline-none placeholder-gray-500 transition-all"
                        placeholder={SEARCH_PLACEHOLDER}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="flex flex-col w-full justify-center items-center">
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