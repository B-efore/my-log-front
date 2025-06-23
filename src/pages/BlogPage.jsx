import Header from "../components/header/Header";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import defaultProfileImage from "../assets/mini왹.png";
import "./BlogPage.css"
import { getUser } from "../api/userService";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../util/toast";
import { getAllPosts, getPostsByCategoryAndTags } from "../api/postService";
import { getCategoriesWithCount } from "../api/categoryService";
import { getAllTagsWithCount } from "../api/tagService";

const BlogPage = () => {

    const [user, setUser] = useState(null);
    const [pinnedPosts, setPinnedPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [selectedTagIds, setSelectedTagIds] = useState([]);

    const [dataLoaded, setDataLoaded] = useState({
        user: false,
        posts: false,
        categories: false,
        tags: false
    });

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalPosts: 0,
        size: 10
    });

    const [loading, setLoading] = useState(!user);

    const { userId } = useParams();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'home';

    const tabConfig = [
        { key: 'home', label: '홈' },
        { key: 'posts', label: '게시글' }
    ];

    const getProfileImage = (key) => {
        return key ? `https://mylog-image-bucket.s3.ap-northeast-2.amazonaws.com/${key}` : defaultProfileImage;
    }

    const handleCategoryClick = (id) => {
        setSelectedCategoryId(id === selectedCategoryId ? 0 : id);
    }

    const handleTagClick = (tagId) => {
        setSelectedTagIds(prev =>
            prev.includes(tagId)
            ? prev.filter(id => id !== tagId)
            : [...prev, tagId]
        );
    }

    const generatePageNumbers = () => {
        const { currentPage, totalPages } = pagination;
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage === totalPages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        const visibleCount = endPage - startPage + 1;

        return Array.from({ length: visibleCount }, (_, i) => startPage + i);
    };

    const handlePageChange = async (pageNumber) => {
        if (pageNumber < 1 || pageNumber > pagination.totalPages || pageNumber === pagination.currentPage) {
            return;
        }

        try {
            setLoading(true);
            setPagination(prev => ({
                ...prev,
                currentPage: pageNumber
            }));

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('페이지 로딩 실패:', error);
            setPagination(prev => ({
                ...prev,
                currentPage: pagination.currentPage
            }));
        } finally {
            setLoading(false);
        }
    };

    const fetchPosts = async (page = 0, size = 10) => {
        try {
            const res = await getAllPosts(userId, page, size);
            setPosts(res.data.posts);
            setPagination({
                currentPage: res.data.page + 1,
                size: res.data.size,
                totalPages: res.data.totalPages,
                totalPosts: res.data.totalElements
            });
            console.log(res);
        } catch (err) {
            showErrorToast("게시글을 불러오는데 실패했습니다.");
        }
    }

    const fetchCategories = async () => {
        try {
            const res = await getCategoriesWithCount(userId);
            setCategories([{categoryId: 0, name: '전체', postCount: res.data.totalCount},
                ...res.data.categories
            ]);
            console.log("categories: ", res);
        } catch (err) {
            showErrorToast("카테고리를 불러오는데 실패했습니다.");
        }
    };

    const fetchTags = async () => {
        try {
            const res = await getAllTagsWithCount(userId);
            console.log(res);
            setTags(res.data.tags);
        } catch (err) {
            showErrorToast("태그를 불러오는데 실패했습니다.");
        }
    };

    useEffect(() => {
        const initHomeTabData = async () => {
            try {
                setLoading(true);
                const res = await getUser(userId);
                console.log(res);
                setUser(res.data);
                setPinnedPosts(res.data.pinnedPosts);
                setDataLoaded(prev => ({ ...prev, user: true }));
            } catch (err) {
                showErrorToast("유저 정보를 불러오는데 실패했습니다.");
                navigate("/");
            } finally {
                setLoading(false);
            }
        }

        initHomeTabData();
    }, [userId]);

    useEffect(() => {
        const loadPostsTabData = async () => {
            if (activeTab === 'posts') {
                if (!dataLoaded.posts) {
                    setLoading(true);
                    try {
                        await Promise.all([
                            !dataLoaded.categories && fetchCategories(),
                            !dataLoaded.tags && fetchTags(),
                            fetchPosts(0, 10)
                        ]);
                        setDataLoaded(prev => ({
                            ...prev,
                            posts: true,
                            categories: true,
                            tags: true
                        }));
                    } catch (err) {
                        showErrorToast("게시글을 불러오는데 실패했습니다.");
                    } finally {
                        setLoading(false);
                    }
                }
            }
        };

        loadPostsTabData();
    }, [activeTab, dataLoaded]);

    useEffect(()=>{
        getPostsByCategoryAndTags(userId, selectedCategoryId, selectedTagIds)
        .then((res) => {
            setPosts(res.data.posts);
            setPagination({
                currentPage: res.data.page + 1,
                size: res.data.size,
                totalPages: res.data.totalPages,
                totalPosts: res.data.totalElements
            });
        });

    }, [selectedCategoryId, selectedTagIds]);

    if (loading || !user) {
        return <div></div>
    }


    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return (
                    <div className="blog-home-body">
                        <div className="blog-profile-section">
                            <img
                                src={getProfileImage(user.imageKey)}
                                alt="profile"
                                className="blog-profile"
                            />
                            <b className="owner-name">{user.username}</b>
                            <p className="owner-bio">{user.bio}</p>
                        </div>
                        <div className="blog-profile-activity-section">
                            <b>소개</b>
                            <div className="blog-introduce-section">
                                <ReactMarkdown remarkPlugins={remarkGfm}>소개md파일</ReactMarkdown>
                            </div>
                            <b>메인</b>
                            <div className="blog-main-section">
                                <ol className="blog-main-posts">
                                    {pinnedPosts && pinnedPosts.length > 0 ? (
                                        pinnedPosts.map((post, index) => (
                                            <li key={post.postId || index} className="main-post">
                                                <div className="post-card">
                                                    <span
                                                        className="post-card-title"
                                                        onClick={() => navigate(`/posts/${post.postId}`)}
                                                    >
                                                        {post.title}
                                                    </span>
                                                    <p className="post-card-content">{post.contentPreview}</p>
                                                </div>
                                            </li>

                                        ))
                                    ) : (
                                        <p>고정된 게시글이 없습니다.</p>
                                    )}
                                </ol>
                            </div>
                            <b>활동</b>
                            <div className="blog-activity-section">
                            </div>
                        </div>
                    </div>
                );
            case 'posts':
                return (
                    <div className="blog-posts-body">
                        <div className="blog-sidebar-section">
                            {categories.length > 0 && (
                                <span className="sidebar-title">카테고리</span>
                            )}
                            <ul className="sidebar-list">
                                {categories.map((category) => (
                                    <li
                                        key={category.categoryId}
                                        className={`sidebar-item ${selectedCategoryId === category.categoryId ? "active" : ""}`}
                                        onClick={()=> handleCategoryClick(category.categoryId)}
                                    >
                                        <span className="sidebar-link">
                                            {category.name}
                                            {category.postCount >= 0 && <span className="count"> ({category.postCount})</span>}
                                        </span>

                                    </li>
                                ))}
                            </ul>
                            {tags.length > 0 && (
                                <span className="sidebar-title">태그</span>
                            )}
                            <ul className="sidebar-list">
                                {tags.map((tag) => (
                                    <li
                                        key={tag.id}
                                        className={`sidebar-item ${selectedTagIds.includes(tag.id) ? "active" : ""}`}
                                        onClick={()=> handleTagClick(tag.id)}
                                    >
                                        <span className="sidebar-link">
                                            {tag.name}
                                            {tag.postCount && <span className="count"> ({tag.postCount})</span>}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="blog-posts-section">
                            <div className="blog-searching-section">
                                <div className="search-bar"></div>
                            </div>
                            <div className="blog-posts">
                                {posts.map((post) => (
                                    <article key={post.postId} className="blog-post">
                                        <div className="post-date">2025.06.11</div>
                                        <h2 className="post-title" onClick={() => navigate(`/posts/${post.postId}`)}>{post.title}</h2>
                                        {post.contentPreview && <p className="post-content" onClick={() => navigate(`/posts/${post.postId}`)}>{post.contentPreview}</p>}
                                    </article>
                                ))}
                            </div>

                            <div className="pagination">

                                {pagination.currentPage > 1 && (
                                    <span
                                        className="page-nav"
                                        onClick={() => handlePageChange(1)}
                                    >
                                        {'<<'}
                                    </span>
                                )}

                                {pagination.currentPage > 1 && (
                                    <span
                                        className="page-nav"
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    >
                                        {'<'}
                                    </span>
                                )}

                                {generatePageNumbers().map(pageNum => (
                                    <span
                                        key={pageNum}
                                        className={`page-number ${pagination.currentPage === pageNum ? 'active' : ''}`}
                                        onClick={() => handlePageChange(pageNum)}
                                    >
                                        {pageNum}
                                    </span>
                                ))}

                                {pagination.currentPage < pagination.totalPages && (
                                    <span
                                        className="page-nav"
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    >
                                        {'>'}
                                    </span>
                                )}

                                {pagination.currentPage < pagination.totalPages && (
                                    <span
                                        className="page-nav"
                                        onClick={() => handlePageChange(pagination.totalPages)}
                                    >
                                        {'>>'}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div>페이지를 찾을 수 없습니다.</div>
        }
    }

    return (
        <div>
            <Header
                showTabs={true}
                tabs={tabConfig}
                defaultTab="home"
            />
            <div className="header-spacer with-tabs"></div>

            <div className="blog-container">
                <div className="tab-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;