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
        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-3 lg:gap-4 pt-12 box-border mx-auto">
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

            <div className="flex flex-col text-left flex-1 sm:flex-[4] w-full min-w-[280px] sm:min-w-[600px] md:min-w-[600px] lg:min-w-[750px]">
                <h3
                    onClick={handleGhostClick}
                    className={`text-center cursor-pointer transition-all duration-300 ease-in-out font-orbit font-black text-violet-700 text-xs md:text-base lg:text-lg break-words select-none
                        ${showSearch ? "!text-green-500 " : " "}`}
                >Click?! - ଲ ༼Ꙩ Ꙩ ଲ༽ * 외계 모아 우주인 * .･:* Ξ ҉ Ξ ҉ ☾*
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
            </div>
        </div>
    );
}

export default BlogPostsTab;