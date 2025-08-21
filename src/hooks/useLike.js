import { useEffect, useState } from "react";
import { createLike, deleteLike, getLikeCount, getLikeStatus } from "../api/likeService";

export const useLike = (postId, isLoggedIn) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (postId) {
            getLikeCount(postId)
                .then(res => setLikeCount(res.data))
                .catch(console.error);

            if (isLoggedIn) {
                getLikeStatus(postId)
                    .then(res => setIsLiked(res.data))
                    .catch(console.error);
            }
        }
    }, [postId, isLoggedIn]);

    const handleLike = async () => {
        if (!isLoggedIn || loading) return;
        setLoading(true);

        try {
            await createLike(postId);
            setIsLiked(true);
            setLikeCount(prev => prev + 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUnlike = async () => {
        if (!isLoggedIn || loading) return;
        setLoading(true);

        try {
            await deleteLike(postId);
            setIsLiked(false);
            setLikeCount(prev => prev - 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { isLiked, likeCount, handleLike, handleUnlike, loading };
};
