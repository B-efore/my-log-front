import { useNavigate } from "react-router-dom"
import { getProfileImage } from "../../util/get-images";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import React, { useEffect, useState } from "react";


const BlogHome = ({ user, pinnedPosts, activities }) => {
    const navigate = useNavigate();
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    useEffect(() => {
        const today = new Date();
        const past = new Date();
        past.setDate(today.getDate() - 365);

        setEnd(today);
        setStart(past);

        console.log("start: ", today);
        console.log(past);
    }, []);

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
                <b>보라</b>
                <div className="blog-introduce-section">
                    <ReactMarkdown remarkPlugins={remarkGfm}>소개md파일</ReactMarkdown>
                </div>
                <b>찍다</b>
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
                <b>행성 정복도</b>
                <div className="blog-activity-section">
                    <CalendarHeatmap
                        className="blog-calendar"
                        startDate={start}
                        endDate={end}
                        values={activities}
                        gutterSize={2}
                        classForValue={(value) => {
                            if (!value || value.count === 0) return 'color-empty';
                            if (value.count === 1) return 'color-scale-1';
                            if (value.count === 2) return 'color-scale-2';
                            return 'color-scale-3';
                        }}
                        transformDayElement={(el, value) => {
                            return React.cloneElement(el, {
                                rx: 1,
                                width: 9,
                                height: 9,
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default BlogHome;