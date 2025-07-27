import { useEffect, useState } from "react";
import { usePagination } from "./usePagination";


export const useFiltersWithPagination = (initialPage = 0, initialSize = 10) => {

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

    return {
        selectedCategoryId,
        selectedTagIds,
        handleCategoryClick,
        handleTagClick,
        pagination,
        updatePagination,
        handlePageChange,
        generatePageNumbers,
    };
};
