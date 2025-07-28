const LikePage = () => {

    return (
        <div className="flex flex-col text-left flex-1 w-full sm:flex-[4] min-w-[280px] sm:min-w-[600px] md:min-w-[600px] lg:min-w-[750px]">
            <h3
                className="font-alien-violet text-base md:text-lg lg:text-xl break-words"
            >ଲ༼Ꙩ Ꙩ ଲ༽ * 외계 모아 우주인 * .･:*◢▅◣Ξ◥▅◤Ξ ҉ ◢▅◣Ξ ҉ ◥▅◤☾*
            </h3>
            <BlogPostList
                posts={posts}
                onPostClick={(postId) => navigate(`/posts/${postId}`)}
            />
            <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
                generatePageNumbers={generatePageNumbers}
            />
            <h3 className="font-alien-violet text-base md:text-lg lg:text-xl break-words mb-12">.･:*◢▅◣Ξ◥▅◤Ξ ҉ ◢▅◣Ξ ҉ ◥▅◤☾* * 우주 모아 외계인 * ଲ༼Ꙩ Ꙩ ଲ༽</h3>
        </div>
    );
};

export default LikePage;