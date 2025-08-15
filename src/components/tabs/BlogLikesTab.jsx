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
        <div className="blog-tab-body">
                <div className="blog-tab-sidebar">
                    <div className="text-left flex-1">
                        <strong className="text-base font-orbit font-black text-violet-500 no-underline">
                            외계인 푸딩의 효능
                        </strong>
                        <p className="mt-1 text-sm underline">
                            총 {pagination.totalPosts}마리의 외계인 푸딩
                        </p>
                    </div>
                </div>

                <div className="blog-tab-content">
                    <h3 className="font-orbit blog-tab-content-header">
                        *☆ ς( ᐡ-ﻌ•ᐡ ) ♡ (^•ﻌ•^ღ) * 푸딩 모아 강아지 ✧∘☆
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
                </div>
            </div>
    );
};

export default BlogLikesTab;