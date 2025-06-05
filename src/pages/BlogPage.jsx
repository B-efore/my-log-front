import Header from "../components/header/Header";
import { useAuth } from "../context/AuthContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import defaultProfileImage from "../assets/mini왹.png";
import "./BlogPage.css"

const BlogPage = () => {

    const { userImage, username, bio } = useAuth();

    return (
        <div>
            <Header />
            <div className="blog-container">
                <div className="blog-navigator">
            
                </div>
                <div className="blog-body">
                        <div className="blog-profile-section">
                            <img
                                src={userImage || defaultProfileImage}
                                alt="profile"
                                className="blog-profile"
                             />
                            <b className="owner-name">{ username }</b>
                            <p className="owner-bio">{ bio }</p>
                        </div>
                        <div className="blog-home-section">
                            <b>소개</b>
                            <div className="blog-introduce-section">
                                <ReactMarkdown remarkPlugins={remarkGfm}>소개md파일</ReactMarkdown>
                            </div>
                            <b>메인</b>
                            <div className="blog-main-section">
                                <ol className="blog-main-posts">
                                    <li className="post">
                                        <div className="post-card">
                                            <span className="post-card-title">제목</span>
                                            <p className="post-card-content">내용안녕하세요안녕내용안녕하세요안녕내용안녕하세요안녕내용안녕하세요안녕내용안녕하세요안녕내용안녕하세요안녕내용안녕하세요안녕내용안녕하세요안녕내용안녕하세요안녕내용안녕하세요안녕내용안녕하세요안녕내용안녕하세요안녕내용안녕하세요안녕내용안녕하세요안녕내용안녕하세요안녕내용안녕하세요안녕내용안녕하세요안녕</p>
                                        </div>
                                    </li>
                                    <li className="post"></li>
                                    <li className="post"></li>
                                    <li className="post"></li>
                                </ol>
                            </div>
                            <b>활동</b>
                            <div className="blog-activity-section">
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default BlogPage;