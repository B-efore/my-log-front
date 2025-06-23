import { useNavigate } from "react-router-dom"
import { getProfileImage } from "../../util/get-images";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogHome = ({ user, pinnedPosts }) => {
    const navigate = useNavigate();

    return (
        <div className="blog-home-body">
            <div className="blog-profile-section">
                <img
                    src={getProfileImage(user.imageKey)}
                    alt="profile"
                    className="blog-profile"
                />
                <b className="owner-name">{user.username}</b>
                <p className="owner-bio">{user.bio}</p>
            </div>
            <div className="blog-profile-activity-section">
                <b>소개</b>
                <div className="blog-introduce-section">
                    <ReactMarkdown remarkPlugins={remarkGfm}>소개md파일</ReactMarkdown>
                </div>
                <b>메인</b>
                <div className="blog-main-section">
                    <ol className="blog-main-posts">
                        {pinnedPosts && pinnedPosts.length > 0 ? (
                            pinnedPosts.map((post, index) => (
                                <li key={post.postId || index} className="main-post">
                                    <div className="post-card">
                                        <span
                                            className="post-card-title"
                                            onClick={() => navigate(`/posts/${post.postId}`)}
                                        >
                                            {post.title}
                                        </span>
                                        <p className="post-card-content">{post.contentPreview}</p>
                                    </div>
                                </li>

                            ))
                        ) : (
                            <p>고정된 게시글이 없습니다.</p>
                        )}
                    </ol>
                </div>
                <b>활동</b>
                <div className="blog-activity-section">
                </div>
            </div>
        </div>
    );
}

export default BlogHome;