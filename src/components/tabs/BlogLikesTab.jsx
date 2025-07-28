import { useNavigate } from "react-router-dom";
import BlogPostList from "../blog/BlogPostList";
import Pagination from "../pagination/Pagination";

const BlogLikesTab = ({
    likes,
    pagination,
    onPageChange,
    generatePageNumbers
}) => {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-2 md:gap-3 lg:gap-4 pt-12 px-4 box-border mx-auto">
                <div className="w-full sm:w-auto flex-[1] min-w-[150px]">
                    <div className="text-left flex-1">
                        <strong className="text-base font-default-bold text-violet-500 no-underline">
                            외계인 푸딩의 효능
                        </strong>
                        <p className="mt-1 text-sm underline">
                            총 {pagination.totalPosts}마리의 외계인 푸딩
                        </p>
                    </div>
                </div>

                <div className="flex flex-col text-left flex-1 w-full sm:flex-[4] w-[280px] sm:w-[600px] md:w-[600px] lg:w-[750px]">
                    <h3 className="font-alien-violet text-base md:text-lg lg:text-xl break-words">
                        *✧∘*☆ ς( ᐡ-ﻌ•ᐡ ) ♡ (^•ﻌ•^ღ) * 푸딩 모아 강아지 * ▇▆▅▃▂▁ԅ(ㅇㅅㅇԅ) *✧∘*☆
                    </h3>

                    <BlogPostList
                        posts={likes}
                        onPostClick={(postId) => navigate(`/posts/${postId}`)}
                    />
                    <Pagination
                        pagination={pagination}
                        onPageChange={onPageChange}
                        generatePageNumbers={generatePageNumbers}
                    />
                    <h3 className="font-alien-violet text-base md:text-lg lg:text-xl break-words mb-12">
                        *✧∘*☆ ς( ᐡ-ﻌ•ᐡ ) ♡ (^•ﻌ•^ღ) * 푸딩 모아 강아지 * ▇▆▅▃▂▁ԅ(ㅇㅅㅇԅ) *✧∘*☆
                    </h3>
                </div>
            </div>
    );
};

export default BlogLikesTab;