import BlogHome from "../blog/BlogHome";

const BlogHomeTab = ({
    user, readme, pinnedPosts, activities, loading
}) => {

    if (loading || !user) {
        return <div></div>;
    }

    return (
        <BlogHome
            user={user}
            readme={readme}
            pinnedPosts={pinnedPosts}
            activities={activities}
        />
    );
};

export default BlogHomeTab;