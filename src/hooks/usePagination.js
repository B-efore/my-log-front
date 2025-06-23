import { useState } from "react";

export function usePagination(initialPage = 1, initialSize = 10) {

    const [pagination, setPagination] = useState({
        currentPage: initialPage,
        totalPages: 1,
        totalPosts: 0,
        size: initialSize
    });

    const updatePagination = (newPagination) => {
        setPagination(newPagination);
    }

    const handlePageChange = (pageNumber) => {

        if (pageNumber < 1 || pageNumber > pagination.totalPages || pageNumber === pagination.currentPage) {
            return;
        }

        try {
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
        }
    };

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

    return {
        pagination,
        updatePagination,
        handlePageChange,
        generatePageNumbers
    };
};