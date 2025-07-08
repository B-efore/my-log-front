import Header from "../components/header/Header";
import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../util/toast";
import { useUserProfile } from "../hooks/useUserProfile";
import { usePostList } from "../hooks/usePostList";
import { usePagination } from "../hooks/usePagination";
import { useFilters } from "../hooks/useFilters";
import { useCategories } from "../hooks/useCategories";
import { useTags } from "../hooks/useTags";
import BlogHome from "../components/blog/BlogHome";
import BlogSidebar from "../components/blog/BlogSidebar";
import BlogPostList from "../components/blog/BlogPostList";
import Pagination from "../components/pagination/Pagination";
import "./BlogPage.css"

const TAB_CONFIG = [
    { key: 'home', label: '고향' },
    { key: 'posts', label: '적은것' }
];

const BlogPage = () => {

    const { userId } = useParams();
    const [searchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'home';
    const navigate = useNavigate();

    const { user, pinnedPosts, activityDate, loading: userLoading } = useUserProfile(userId);
    const { posts, loading: postsLoading, fetchAllPosts, fetchPostsWithFilter } = usePostList(userId);
    const { categories, lodaing: categoriesLoading, fetchCategoriesWithCount } = useCategories(userId);
    const { tags, loading: tagsLoading, fetchTagsWithCount } = useTags(userId);

    const { pagination, updatePagination, handlePageChange, generatePageNumbers } = usePagination();
    const { selectedCategoryId, selectedTagIds, handleCategoryClick, handleTagClick } = useFilters(fetchPostsWithFilter, updatePagination);

    const [dataLoaded, setDataLoaded] = useState({
        user: false,
        posts: false,
        categories: false,
        tags: false
    });

    const updateDataLoaded = useCallback((updates) => {
        setDataLoaded(prev => ({ ...prev, ...updates }));
    }, []);

    const loadPostsTabData = useCallback(async () => {
        if (activeTab === 'posts' && !dataLoaded.posts) {
            try {
                await Promise.all([
                    !dataLoaded.categories && fetchCategoriesWithCount(),
                    !dataLoaded.tags && fetchTagsWithCount(),
                ]);
                const postsRes = await fetchAllPosts(0, 10)
                updatePagination(postsRes);
                updateDataLoaded({
                    posts: true,
                    categories: true,
                    tags: true
                })
            } catch (err) {
                showErrorToast("데이터를 불러오는데 실패했습니다.");
            }
        }
    }, [activeTab, dataLoaded]);

    useEffect(() => {
        loadPostsTabData();
    }, [loadPostsTabData, activeTab]);

    const renderHomeContent = () => {
        if (userLoading || !user) {
            return <div></div>
        }

        return <BlogHome user={user} pinnedPosts={pinnedPosts} activities={activityDate} />
    };

    const renderPostsContent = () => {
        const showSidebar = !categoriesLoading && !tagsLoading;
        const showPosts = !postsLoading;

        return (
            <div className="flex flex-row w-90vw gap-4 pt-12">
                {showSidebar && (
                    <BlogSidebar
                        categories={categories}
                        tags={tags}
                        selectedCategoryId={selectedCategoryId}
                        selectedTagIds={selectedTagIds}
                        onCategoryClick={handleCategoryClick}
                        onTagClick={handleTagClick}
                    />
                )}

                <div className="flex flex-col text-left flex-3">
                    <h3
                        className="font-alien-violet"
                    >ଲ༼Ꙩ Ꙩ ଲ༽ * 외계 모아 우주인 * .･:*◢▅◣Ξ◥▅◤Ξ ҉ ◢▅◣Ξ ҉ ◥▅◤☾*
                    </h3>
                    {showPosts
                        ?
                        <BlogPostList
                            posts={posts}
                            onPostClick={(postId) => navigate(`/posts/${postId}`)}
                        />
                        : <></>
                    }
                    <Pagination
                        pagination={pagination}
                        onPageChange={handlePageChange}
                        generatePageNumbers={generatePageNumbers}
                    />
                    <h3 className="font-alien-violet mb-12">.･:*◢▅◣Ξ◥▅◤Ξ ҉ ◢▅◣Ξ ҉ ◥▅◤☾* * 우주 모아 외계인 * ଲ༼Ꙩ Ꙩ ଲ༽</h3>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return renderHomeContent();
            case 'posts':
                return renderPostsContent();
            default:
                return <div>우주 미아가 되다.</div>
        }
    }

    return (
        <div className="pt-24 w-full h-full flex flex-col">
            <Header
                showTabs={true}
                tabs={TAB_CONFIG}
                defaultTab="home"
            />
            <div className="header-spacer with-tabs"></div>

            <div className="flex w-full h-full flex-col box-border">
                <div className="flex min-w-[360px] max-w-[1024px] mx-4 justify-center self-center box-border">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;