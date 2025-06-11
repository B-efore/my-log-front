import Header from "../components/header/Header";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import defaultProfileImage from "../assets/mini왹.png";
import "./BlogPage.css"
import { getUser } from "../api/userService";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(!user);

    const { userId } = useParams();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'home';

    const tabConfig = [
        { key: 'home', label: '홈' },
        { key: 'posts', label: '게시글' }
    ];


    useEffect(() => {

        if (!user) {
            getUser(userId)
                .then((res) => {
                    console.log(res.data);
                    setUser(res.data);
                    setPosts(res.data.pinnedPosts)
                    setLoading(false);
                })
                .catch((err) => {
                    showErrorToast("유저 정보를 불러오는데 실패했습니다.");
                    navigate("/");
                });
        }
    }, [userId]);

    if (loading || !user) {
        return <div></div>
    }


    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return (
                    <div className="blog-body">
                        <div className="blog-profile-section">
                            <img
                                src={`https://mylog-image-bucket.s3.ap-northeast-2.amazonaws.com/${user.imageKey}` || defaultProfileImage}
                                alt="profile"
                                className="blog-profile"
                            />
                            <b className="owner-name">{user.username}</b>
                            <p className="owner-bio">{user.bio}</p>
                        </div>
                        <div className="blog-home-section">
                            <b>소개</b>
                            <div className="blog-introduce-section">
                                <ReactMarkdown remarkPlugins={remarkGfm}>소개md파일</ReactMarkdown>
                            </div>
                            <b>메인</b>
                            <div className="blog-main-section">
                                <ol className="blog-main-posts">
                                    {posts && posts.length > 0 ? (
                                        posts.map((post, index) => (
                                            <li className="post">
                                                <div key={post.postId || index} className="post-card">
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
            case 'posts':
                return (
                    <div></div>
                );
            default:
                return <div>페이지를 찾을 수 없습니다.</div>
        }
    }

    return (
        <div>
            <Header
                showTabs={true}
                tabs={tabConfig}
                defaultTab="home"
            />
            <div className="header-spacer with-tabs"></div> 
            <div className="blog-container">
                <div className="tab-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;