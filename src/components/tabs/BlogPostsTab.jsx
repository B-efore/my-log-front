import { useNavigate } from "react-router-dom";
import BlogPostList from "../blog/BlogPostList";
import Pagination from "../pagination/Pagination";
import BlogSidebar from "../blog/BlogSidebar";
import { useState } from "react";
import { showAlienToast } from "../../util/toast";

const BlogPostsTab = ({
    posts,
    categories,
    tags,
    categoriesLoading,
    tagsLoading,
    selectedCategoryId,
    selectedTagIds,
    onCategoryClick,
    onTagClick,
    pagination,
    onPageChange,
    generatePageNumbers,
    keyword,
    setKeyword,
}) => {

    const navigate = useNavigate();
    const showSidebar = !categoriesLoading && !tagsLoading;
    const [showSearch, setShowSearch] = useState(false);

    const handleGhostClick = () => {
        setShowSearch(prev => !prev);
    }

    return (
        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-2 md:gap-3 lg:gap-4 pt-12 px-4 box-border mx-auto">
            {showSidebar && (
                <div className="w-full sm:w-auto flex-[1] min-w-[150px]">

                    <BlogSidebar
                        categories={categories}
                        tags={tags}
                        selectedCategoryId={selectedCategoryId}
                        selectedTagIds={selectedTagIds}
                        onCategoryClick={onCategoryClick}
                        onTagClick={onTagClick}
                    />
                </div>
            )}

            <div className="flex flex-col text-left flex-1 w-full sm:flex-[4] w-[280px] sm:w-[600px] md:w-[600px] lg:w-[750px]">
                <h3
                    onClick={handleGhostClick}
                    className={`cursor-pointer transition-all duration-300 ease-in-out font-alien-violet text-base md:text-lg lg:text-xl break-words select-none
                        ${showSearch ? "text-green-500 " : " "}`}
                >Click?! - ଲ ༼Ꙩ Ꙩ ଲ༽ * 외계 모아 우주인 * .･:*◢▅◣Ξ◥▅◤Ξ ҉ ◢▅◣Ξ ҉ ◥▅◤☾*
                </h3>

                {showSearch && (
                    <input
                        type="text"
                        value={keyword}
                        placeholder="너의 우주를 찾다"
                        className="my-2 w-full px-4 py-2 rounded-md placeholder-green-500 text-green-700 border border-green-500 focus:outline-none "
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                )}

                <BlogPostList
                    posts={posts}
                    onPostClick={(postId) => navigate(`/posts/${postId}`)}
                />
                <Pagination
                    pagination={pagination}
                    onPageChange={onPageChange}
                    generatePageNumbers={generatePageNumbers}
                />
                <h3 className="font-alien-violet text-base md:text-lg lg:text-xl break-words mb-12"
                    onClick={() => showAlienToast("쨍그랑!")}
                >
                    ･:*◢▅◣Ξ◥▅◤Ξ ҉ ◢▅◣Ξ ҉ ◥▅◤☾* * 우주 모아 외계인 * ଲ༼Ꙩ Ꙩ ଲ༽ HELLO
                </h3>
            </div>
        </div>
    );
}

export default BlogPostsTab;