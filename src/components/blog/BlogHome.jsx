import { useNavigate } from "react-router-dom"
import { getProfileImage } from "../../util/get-images";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import React, { useCallback, useEffect, useState } from "react";
import { follow, unfollow, checkFollowing, getFollowers, getFollowings } from "../../api/followService";
import { showErrorToast, showSuccessToast } from "../../util/toast";
import { HttpStatusCode } from "axios";
import { useAuth } from "../../context/AuthContext";


const BlogHome = ({ user, pinnedPosts, activities }) => {
    const { userId, isLoggedIn } = useAuth();
    const [followStatue, setFollowStatue] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);

    const navigate = useNavigate();
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    useEffect(() => {
        const today = new Date();
        const past = new Date();
        past.setDate(today.getDate() - 365);

        setEnd(today);
        setStart(past);
    }, []);

    useEffect(() => {
        const fetchFollowData = async () => {
            try {
                const [followersRes, followingsRes] = await Promise.all([
                    getFollowers(userId),
                    getFollowings(userId),
                ]);

                setFollowers(followersRes.data.follows);
                setFollowings(followingsRes.data.follows);
            } catch (error) {
                console.error(error);
            }
        };

        if (userId) {
            fetchFollowData();
        }

    }, [userId]);


    const checkFollowStatus = useCallback(async () => {
        try {
            const res = await checkFollowing(userId, user.userId);
            console.log(res);
            setFollowStatue(res.data);
        } catch (err) {
            console.log(err);
        }
    }, [follow]);

    useEffect(() => {
        checkFollowStatus();
    }, [checkFollowStatus]);

    const handleFollowBtn = async (e) => {
        e.preventDefault();

        if (followStatue) {
            handleUnfollow(e);
        } else {
            handleFollow(e);
        }
    }

    const handleFollow = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) return;

        try {
            const res = await follow(user.userId);
            if (res.status != 200) {
                throw err;
            }
            setFollowStatue(true);
            showSuccessToast("뽈뽈");
        } catch (err) {
            console.error("요청 실패");
            showErrorToast("놓치다!");
        }
    };

    const handleUnfollow = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) return;

        try {
            const res = await unfollow(user.userId);
            if (res.status != HttpStatusCode.NoContent) {
                throw err;
            }
            setFollowStatue(false);
            showSuccessToast("삐-빠이");
        } catch (err) {
            console.error("요청 실패");
            showErrorToast("붙어있다!");
        }
    };

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
                {userId != user.userId && isLoggedIn ?
                    <button className="follow-btn" onClick={handleFollowBtn}>{followStatue ? '방생하다' : '포획하다'}</button>
                    :
                    <></>
                }
                <div className="follow-section">
                    <p><strong>{followers.length}</strong> 잡혔다!</p>
                    <p><strong>{followings.length}</strong>  잡았다!</p>
                </div>
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
                        // classForValue={(value) => {
                        //     if (!value || value.count === 0) return 'color-empty';
                        //     if (value.count === 1) return 'color-scale-1';
                        //     if (value.count === 2) return 'color-scale-2';
                        //     return 'color-scale-3';
                        // }}
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