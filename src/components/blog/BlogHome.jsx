import { useLocation, useNavigate } from "react-router-dom"
import { getProfileImage } from "../../util/get-images";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import React, { useCallback, useEffect, useState } from "react";
import { follow, unfollow, checkFollowing, getFollowCounts } from "../../api/followService";
import { showErrorToast, showSuccessToast } from "../../util/toast";
import { HttpStatusCode } from "axios";
import { useAuth } from "../../context/AuthContext";
import PinnedPostList from "./PinnedPostList";
import MarkdownView from "../post/MarkdownView";


const BlogHome = ({ user, readme, pinnedPosts, activities }) => {
    const { userId, isLoggedIn } = useAuth();
    const [followStatue, setFollowStatue] = useState(null);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const isOwner = userId === user.userId;

    const location = useLocation();
    const navigate = useNavigate();
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const fetchFollowData = useCallback(async () => {
        try {
            const res = await getFollowCounts(user.userId);
            setFollowerCount(res.data.followerCount);
            setFollowingCount(res.data.followingCount);
        } catch (error) {
            console.error(error);
        }
    }, [userId]);

    useEffect(() => {
        const today = new Date();
        const past = new Date();
        past.setDate(today.getDate() - 365);

        setEnd(today);
        setStart(past);
    }, []);

    useEffect(() => {
        if (user?.userId) {
            fetchFollowData();
        }
    }, [userId, fetchFollowData]);

    const checkFollowStatus = useCallback(async () => {
        try {
            const res = await checkFollowing(userId, user.userId);
            setFollowStatue(res.data);
        } catch (err) {
            console.log(err);
        }
    }, [follow]);

    useEffect(() => {
        if (isLoggedIn) {
            checkFollowStatus();
        }
    }, [checkFollowStatus]);

    const handleFollowBtn = async (e) => {
        e.preventDefault();

        if (followStatue) {
            handleUnfollow(e);
        } else {
            handleFollow(e);
        }

        setTimeout(() => {
            fetchFollowData();
        }, 500);
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

    const handleReadmeEdit = async () => {
        if (!isOwner) return;
        navigate(`/${userId}/readme`, {
            state: {readme, from: location.pathname}
        });
    }

    return (
        <div className="flex flex-col mb-8 md:flex-row w-full gap-8 md:gap-12 lg:gap-16 pt-12 box-border">
            <div className="flex flex-col items-center md:items-start flex-1">
                <img
                    src={getProfileImage(user.imageKey)}
                    alt="profile"
                    className="w-48 md:w-full md:max-w-xs profile border-2 border-gray-200"
                />
                <span className="font-orbit font-black mt-4 text-xl md:text-2xl text-center md:text-left break-words">{user.username}</span>
                <p className="mt-2 text-sm md:text-base text-center md:text-left break-words">{user.bio}</p>
                {userId != user.userId && isLoggedIn ?
                    <button className="w-full my-4 py-0.5 text-white rounded-md border-none font-alien bg-green-700 hover:bg-green-800 transition-colors" onClick={handleFollowBtn}>{followStatue ? '방생하다' : '포획하다'}</button>
                    :
                    <></>
                }
                <div className="flex flex-row md:flex-col text-left font-orbit font-black mt-2">
                    <p className="pt-0 m-0 text-green-700 hover:text-green-800 hover:cursor-pointer" onClick={() => navigate(`/${user.userId}/followers`)}><strong>{followerCount}</strong> 잡혔다!</p>
                    <p className="pt-0 m-0 text-green-700 hover:text-green-800 hover:cursor-pointer" onClick={() => navigate(`/${user.userId}/followings`)}><strong>{followingCount}</strong>  잡았다!</p>
                </div>
            </div>
            <div className="flex flex-col text-left flex-1 md:flex-4">
                <div className="flex justify-between font-black">
                    <span>외계인 파일</span>
                    {isOwner && (
                        <button
                            className="text-sm text-gray-500 cursor-pointer"
                            onClick={handleReadmeEdit}
                        >
                                편집
                        </button>
                    )}
                </div>
                <div className="round-box-border p-4 h-fit mb-6 text-sm md:text-base">
                    {readme
                        ? (<MarkdownView content={readme?.content}/>)
                        : (<span>{user.userId}번 외계인 {user.username}얌</span>)
                    }
                </div>
                <span className="font-black">외계 수집</span>
                <div className="mb-6 border-box">
                    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full p-0 m-0">
                        <PinnedPostList posts={pinnedPosts} size={4} />
                    </ol>
                </div>
                <span className="font-black">행성 정복도</span>
                <div className="round-box-border p-2 md:p-4 w-full box-border overflow-x-auto">
                    <div className="min-w-fit">
                        <CalendarHeatmap
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
        </div>
    );
}

export default BlogHome;