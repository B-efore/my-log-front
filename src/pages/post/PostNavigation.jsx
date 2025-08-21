import { useNavigate } from "react-router-dom";

const PostNavigation = ({ previousPost, nextPost }) => {

    if (!previousPost && !nextPost) return null;

    return (
        <div className="flex justify-between my-4 gap-4 select-none">
            {previousPost && (
                <NavigationButton
                    post={previousPost}
                    direction="previous"
                />
            )}
            {nextPost && (
                <NavigationButton
                    post={nextPost}
                    direction="next"
                />
            )}
        </div>
    );
};

const NavigationButton = ({ post, direction }) => {

    const navigate = useNavigate();

    const isPrevious = direction === 'previous';
    const buttonClass = `${isPrevious ? 'mr-auto justify-start' : 'ml-auto justify-end'} w-1/2 sm:w-1/3 px-4 py-2 btn-second round-box-border border-green-600 single-line-ellipsis text-center flex items-center gap-2`;

    return (
        <button
            className={buttonClass}
            onClick={() => navigate(`/posts/${post.postId}`)}
        >
            {isPrevious && <span className="text-xs">이전</span>}
            <span className="truncate">{post.title}</span>
            {!isPrevious && <span className="text-xs">다음</span>}
        </button>
    );
};

export default PostNavigation;