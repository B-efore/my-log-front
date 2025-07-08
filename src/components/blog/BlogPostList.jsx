import { getStrongAlien } from "../../util/get-images";

const BlogPostList = ({ posts, onPostClick }) => {
    if (!posts || posts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <p className="mt-4 font-alien text-green-700 text-center">행성 점령도 0% 분발하라.</p>
                <img className="w-1/2" src={getStrongAlien()}/>
            </div>
        );
    }

    return (
        <div className="">
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
        <article className="py-6 text-left border-b-2 border-gray-200 last:border-b-0">
            <div className="text-sm text-black">
                {post.createdAt ? formatDate(post.createdAt) : ''}
            </div>
            <h2 className="w-fit font-extrabold text-2xl mt-2 mb-2 hover:cursor-pointer" onClick={handleClick}>
                {post.title}
            </h2>
            {post.contentPreview && (
                <p className="w-fit text-base m-0 hover:cursor-pointer" onClick={handleClick}>
                    {post.contentPreview}
                </p>
            )}
        </article>
    );
};

export default BlogPostList;