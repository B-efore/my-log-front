import { useLike } from "../../hooks/useLike";
import CommentInput from "../comment/CommentInput";
import LikeBtn from "../like/LikeBtn";

const PostInteractionBar = ({
    postId,
    isLoggedIn,
    commentsCount,
    onCommentSubmit
}) => {

    const { isLiked, likeCount, handleLike, handleUnlike } = useLike(postId, isLoggedIn);

    return (
        <>
            <div className="flex items-center gap-2 mb-4">
                <LikeBtn
                    isLiked={isLiked}
                    likeCount={likeCount}
                    onLike={handleLike}
                    onUnlike={handleUnlike}
                />
                <div className="btn-post border-green-600 btn-post-text text-green-800">
                    댓글 {commentsCount || 0}
                </div>
            </div>
            {isLoggedIn && (
                <CommentInput postId={postId} onCommentSubmit={onCommentSubmit} />
            )}
        </>
    );
};

export default PostInteractionBar;