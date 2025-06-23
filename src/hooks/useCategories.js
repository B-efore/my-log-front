import { useState } from "react";
import { getCategoriesWithCount } from "../api/categoryService";

export function useCategories(userId) {
    
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCategoriesWithCount = async () => {
        try {
            setLoading(true);
            const res = await getCategoriesWithCount(userId);
            const categoriesWithAll = [
                { categoryId: 0, name: '전체', postCount: res.data.totalCount },
                ...res.data.categories
            ];
            setCategories(categoriesWithAll);
            return categoriesWithAll;
        } catch (error) {
            showErrorToast("카테고리를 불러오는데 실패했습니다.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

        return {
        categories,
        loading,
        fetchCategoriesWithCount,
    };
}