import { useNavigate } from "react-router-dom";
import BlogPostList from "../blog/BlogPostList";
import Pagination from "../pagination/Pagination";
import BlogSidebar from "../blog/BlogSidebar";

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
    generatePageNumbers

}) => {

    const navigate = useNavigate();
    const showSidebar = !categoriesLoading && !tagsLoading;

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
                    className="font-alien-violet text-base md:text-lg lg:text-xl break-words"
                >ଲ༼Ꙩ Ꙩ ଲ༽ * 외계 모아 우주인 * .･:*◢▅◣Ξ◥▅◤Ξ ҉ ◢▅◣Ξ ҉ ◥▅◤☾*
                </h3>
                <BlogPostList
                    posts={posts}
                    onPostClick={(postId) => navigate(`/posts/${postId}`)}
                />
                <Pagination
                    pagination={pagination}
                    onPageChange={onPageChange}
                    generatePageNumbers={generatePageNumbers}
                />
                <h3 className="font-alien-violet text-base md:text-lg lg:text-xl break-words mb-12">.･:*◢▅◣Ξ◥▅◤Ξ ҉ ◢▅◣Ξ ҉ ◥▅◤☾* * 우주 모아 외계인 * ଲ༼Ꙩ Ꙩ ଲ༽</h3>
            </div>
        </div>
    );
}

export default BlogPostsTab;