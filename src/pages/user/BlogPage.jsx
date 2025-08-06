import Header from "../../components/header/Header";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useCategories } from "../../hooks/useCategories";
import { useTags } from "../../hooks/useTags";
import { useFiltersWithPagination } from "../../hooks/useFiltersWithPagination";
import { getPostsByCategoryAndTags } from "../../api/postService";
import { getUserLikes } from "../../api/likeService";
import { usePagination } from "../../hooks/usePagination";
import BlogLikesTab from "../../components/tabs/BlogLikesTab";
import BlogPostsTab from "../../components/tabs/BlogPostsTab";
import BlogHomeTab from "../../components/tabs/BlogHomeTab";
import { useTabManagement } from "../../hooks/useTabManagement";
import BlogVisitorsTab from "../../components/tabs/BlogVisitorsTab";
import { getGuestBooks } from "../../api/guestbookService";

const TAB_CONFIG = [
    { key: 'home', label: '고향' },
    { key: 'posts', label: '적은것' },
    { key: 'likes', label: '푸딩' },
    { key: 'visitors', label: '인사' }
];

const BlogPage = () => {

    const { userId } = useParams();
    const { activeTab } = useTabManagement('home');

    const { user, readme, pinnedPosts, activityDate, loading: userLoading } = useUserProfile(userId);

    const { categories, lodaing: categoriesLoading, fetchCategoriesWithCount } = useCategories(userId);
    const { tags, loading: tagsLoading, fetchTagsWithCount } = useTags(userId);
    const [posts, setPosts] = useState([]);
    const { selectedCategoryId, selectedTagIds, handleCategoryClick, handleTagClick,
        pagination, updatePagination, handlePageChange, generatePageNumbers, } = useFiltersWithPagination();

    const [likes, setUserLikes] = useState([]);
    const { pagination: likesPagination,
        updatePagination: updateLikesPagination,
        handlePageChange: handleLikesPageChange,
        generatePageNumbers: generateLikesPageNumbers } = usePagination();

    const [messages, setMessages] = useState([]);
    const { pagination: visitorsPagination,
        updatePagination: updateVisitorsPagination,
        handlePageChange: handleVisitorsPageChange,
        generatePageNumbers: generateVisitorsPageNumbers } = usePagination();

    const [keyword, setKeyword] = useState('');
    const prevKeyword = useRef(keyword);

    const [dataLoaded, setDataLoaded] = useState({
        user: false,
        posts: false,
        categories: false,
        tags: false,
        likes: false
    });

    const updateDataLoaded = useCallback((updates) => {
        setDataLoaded(prev => ({ ...prev, ...updates }));
    }, []);

    useEffect(() => {
        const fetchPosts = async (page = pagination.currentPage, size = pagination.size) => {
            try {
                const res = await getPostsByCategoryAndTags(
                    userId,
                    selectedCategoryId, selectedTagIds, keyword,
                    page, size
                );
                console.log(res);
                setPosts(res.data.objects);
                updatePagination(res.data);
                updateDataLoaded({ post: true });
            } catch (err) {
                console.error(err);
            }
        }

        console.log(prevKeyword.current + "< prev, " + keyword + "< keyword");

        if (activeTab != 'posts') return;

        if (keyword != prevKeyword.current) {
            prevKeyword.current = keyword;
            fetchPosts(0, 10);
        } else {
            fetchPosts();
        }

    }, [userId, activeTab, pagination.currentPage, selectedCategoryId, selectedTagIds, keyword]);

    useEffect(() => {
        const loadTabData = async () => {

            try {
                if (activeTab === 'posts') {
                    await loadPostsTabData();
                } else if (activeTab === 'likes') {
                    await loadLikesTabData();
                } else if (activeTab === 'visitors') {
                    await loadVisitorsTabData();
                }
            } catch (error) {
                console.error(`Error loading ${activeTab} tab:`, error);
            }
        };

        loadTabData();
    }, [activeTab, pagination.currentPage, likesPagination.currentPage, visitorsPagination.currentPage, userId]);

    const loadPostsTabData = async () => {
        if (!dataLoaded.categories) {
            await fetchCategoriesWithCount();
            updateDataLoaded({ categories: true });
        }

        if (!dataLoaded.tags) {
            await fetchTagsWithCount();
            updateDataLoaded({ tags: true });
        }
    }

    const loadLikesTabData = async (page = likesPagination.currentPage, size = likesPagination.size) => {
        try {
            const res = await getUserLikes(userId, page, size);
            setUserLikes(res.data.objects);
            updateLikesPagination(res.data);
            updateDataLoaded({ likes: true });
        } catch (err) {
            console.error(err);
        }
    }

    const loadVisitorsTabData = async (page = visitorsPagination.currentPage, size = visitorsPagination.size) => {
        try {
            const res = await getGuestBooks(userId, page, size);
            setMessages(res.data.objects);
            updateVisitorsPagination(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return (
                    <BlogHomeTab
                        user={user}
                        readme={readme}
                        pinnedPosts={pinnedPosts}
                        activities={activityDate}
                        loading={userLoading}
                    />
                );
            case 'posts':
                return (
                    <BlogPostsTab
                        posts={posts || []}
                        categories={categories}
                        tags={tags}
                        categoriesLoading={categoriesLoading}
                        tagsLoading={tagsLoading}
                        selectedCategoryId={selectedCategoryId}
                        selectedTagIds={selectedTagIds}
                        onCategoryClick={handleCategoryClick}
                        onTagClick={handleTagClick}
                        pagination={pagination}
                        onPageChange={handlePageChange}
                        generatePageNumbers={generatePageNumbers}
                        keyword={keyword}
                        setKeyword={setKeyword}
                    />
                );
            case 'likes':
                return (
                    <BlogLikesTab
                        likes={likes || []}
                        pagination={likesPagination}
                        onPageChange={handleLikesPageChange}
                        generatePageNumbers={generateLikesPageNumbers}
                    />
                );
            case 'visitors':
                return (
                    <BlogVisitorsTab
                        messages={messages || []}
                        setMessages={setMessages}
                        pagination={visitorsPagination}
                        onPageChange={handleVisitorsPageChange}
                        generatePageNumbers={generateVisitorsPageNumbers}
                    />
                )
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