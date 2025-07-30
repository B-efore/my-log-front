import { getProfileImage, getStrongAlien } from "../../util/get-images";

const BlogPostList = ({ posts, onPostClick }) => {
    if (!posts || posts.length === 0) {
        return (
            <div className="flex flex-col items-center mt-24">
                <p className="font-alien text-green-700 text-center">행성 점령도 0% 분발하라.</p>
                <img className="w-2/5" src={getStrongAlien()} />
            </div>
        );
    }

    return (
        <div>
            {posts.map((post) => (
                <BlogPostItem
                    key={post.postId}
                    post={post}
                    onPostClick={onPostClick}
                />
            ))}
        </div>
    );
};

const BlogPostItem = ({ post, onPostClick }) => {

    const handleClick = () => {
        onPostClick(post.postId);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month}.${day}.${year}`;
    };

    return (
        <article className="py-4 text-left border-b-2 border-gray-200 last:border-b-0 hover:cursor-pointer select-none"
            onClick={handleClick}>
            <div className="text-sm text-black">
                {post.createdAt ? formatDate(post.createdAt) : ''}
            </div>
            <h2 className="w-fit mt-2 font-extrabold text-2xl" >
                {post.title}
            </h2>
            {post.contentPreview && (
                <p className="w-fit text-base m-0">
                    {post.contentPreview}
                </p>
            )}
            <div className="mt-4">
                <div className="flex items-end justify-between">
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <img src={getProfileImage(post.user?.imageKey)} className="rounded-full w-5 h-5 border-gray-200 border-2" />
                        <p className="text-sm text-gray-600">{post.user?.username}</p>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-end ml-4 max-w-[60%]">
                            {post.tags.map((tag) => (
                                <span key={tag.tagId}
                                    className="text-xs px-2 py-0.5 bg-violet-600 text-white font-bold rounded-lg whitespace-nowrap"
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

export default BlogPostList;