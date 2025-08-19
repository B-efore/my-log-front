import React, { useEffect, useState } from 'react';
import { getRelatedPosts } from '../../api/postService';
import { usePagination } from './../../hooks/usePagination';
import { useNavigate } from 'react-router-dom';

const CategoryPostList = ({ categoryName, postId }) => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [posts, setPosts] = useState([]);
    const { pagination, updatePagination, handlePageChange, generatePageNumbers } = usePagination();

    useEffect(() => {
        const loadPosts = async (page=pagination.currentPage, size=5) => {
            try {

                if (posts.length === 0) {
                    page = null;
                }

                const res = await getRelatedPosts(
                    postId, page, size
                );
                setPosts(res.data.objects);
                updatePagination(res.data);
            } catch (err) {
                console.error(err);
            }
        }

        loadPosts();
    }, [postId, pagination.currentPage]);


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
        <div className="bg-white round-box-border border-green-600 px-6 py-4 mb-8 w-full select-none">
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex justify-between items-baseline w-full">
                    <div className="flex items-baseline gap-2">
                        <h2 className="font-orbit text-lg font-black">{categoryName}</h2>
                        <span className="px-2 py-1 text-sm rounded text-gray-500">
                            {pagination.totalPosts}개
                        </span>
                    </div>

                    <p className="text-sm text-gray-500">{isOpen ? "닫기" : "열기"}</p>
                </div>
            </div>

            {isOpen && (
                <div>
                    <div className="py-4 divide-y-2 divide-gray-300">
                        {posts.map(post => (
                            <div key={post.postId} className="py-2 cursor-pointer">
                                <div className={post.postId === Number(postId) ? "flex justify-between items-center font-black text-green-600" : "flex justify-between items-center"}
                                    onClick={() => navigate(`/posts/${post.postId}`)}
                                >
                                    <h3 className="hover:underline ">{post.title}</h3>
                                    <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                        <div className="flex justify-center items-center gap-2">
                            <div className="mx-auto my-4">

                                {pagination.currentPage > 0 && (
                                    <span
                                        className="mx-[5px] cursor-pointer hover:text-green-700"
                                        onClick={() => handlePageChange(0)}
                                    >
                                        {'<<'}
                                    </span>
                                )}

                                {pagination.currentPage > 0 && (
                                    <span
                                        className="mx-[5px] cursor-pointer hover:text-green-700"
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    >
                                        {'<'}
                                    </span>
                                )}

                                {generatePageNumbers().map(pageNum => (
                                    <span
                                        key={pageNum}
                                        className={`mx-[5px] cursor-pointer hover:text-green-700 ${pagination.currentPage + 1 === pageNum ? 'text-green-700 font-black' : ''}`}
                                        onClick={() => handlePageChange(pageNum - 1)}
                                    >
                                        {pageNum}
                                    </span>
                                ))}

                                {pagination.currentPage + 1 < pagination.totalPages && (
                                    <span
                                        className="mx-[5px] cursor-pointer hover:text-green-700"
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    >
                                        {'>'}
                                    </span>
                                )}

                                {pagination.currentPage + 1 < pagination.totalPages && (
                                    <span
                                        className="mx-[5px] cursor-pointer hover:text-green-700"
                                        onClick={() => handlePageChange(pagination.totalPages - 1)}
                                    >
                                        {'>>'}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
            )}
        </div>
    );
};

export default CategoryPostList;