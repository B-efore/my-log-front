import { useEffect, useState } from "react";

export const useFilters = (fetchPostsByFilter, updatePagination) => {

    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [selectedTagIds, setSelectedTagIds] = useState([]);

    const handleCategoryClick = (id) => {
        setSelectedCategoryId(id === selectedCategoryId ? 0 : id);
    };

    const handleTagClick = (tagId) => {
        setSelectedTagIds(prev =>
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
    };

    useEffect(() => {

        if (selectedCategoryId == null || selectedTagIds == null) return;

        const applyFilters = async () => {
            try {
                const res = await fetchPostsByFilter(selectedCategoryId, selectedTagIds);
                updatePagination(res.data);
            } catch (error) {
                console.error(error);
            }
        };


        applyFilters();

    }, [selectedCategoryId, selectedTagIds]);

    return {
        selectedCategoryId,
        selectedTagIds,
        handleCategoryClick,
        handleTagClick
    };
};