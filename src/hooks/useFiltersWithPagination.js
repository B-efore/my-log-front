import { useEffect, useRef, useState } from "react";
import { usePagination } from "./usePagination";


export const useFiltersWithPagination = (fetchPostsByFilter, initialPage = 1, initialSize = 10) => {

    const render = useRef(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [selectedTagIds, setSelectedTagIds] = useState([]);

    const {
        pagination,
        updatePagination,
        handlePageChange,
        generatePageNumbers
    } = usePagination(initialPage, initialSize);

    const handleCategoryClick = (id) => {
        setSelectedCategoryId(prevId => prevId === id ? 0 : id);
    };

    const handleTagClick = (tagId) => {
        setSelectedTagIds(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
    };

    const fetchFilteredPosts = async (page = pagination.currentPage) => {
        try {
            const res = await fetchPostsByFilter(selectedCategoryId, selectedTagIds, page-1, pagination.size);

            updatePagination(prev => ({
                ...prev,
                posts: res.posts,
                size: res.size,
                totalPages: res.totalPages,
                totalPosts: res.totalPosts,
            }));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!render.current) {
            render.current = true;
            return;
        }

        fetchFilteredPosts(pagination.currentPage);

    }, [selectedCategoryId, selectedTagIds, pagination.currentPage]);

    return {
        selectedCategoryId,
        selectedTagIds,
        handleCategoryClick,
        handleTagClick,
        pagination,
        handlePageChange,
        generatePageNumbers,
        fetchFilteredPosts
    };
};
