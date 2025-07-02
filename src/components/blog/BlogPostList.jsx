const BlogPostList = ({ posts, onPostClick }) => {
    if (!posts || posts.length === 0) {
        return (
            <div className="no-posts-message">
                게시글이 없습니다.
            </div>
        );
    }

    return (
        <div className="blog-posts">
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
        <article className="blog-post">
            <div className="post-date">
                {post.createdAt ? formatDate(post.createdAt) : ''}
            </div>
            <h2 className="post-title" onClick={handleClick}>
                {post.title}
            </h2>
            {post.contentPreview && (
                <p className="post-content" onClick={handleClick}>
                    {post.contentPreview}
                </p>
            )}
        </article>
    );
};

export default BlogPostList;