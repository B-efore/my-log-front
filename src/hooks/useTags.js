import { useState } from "react";
import { getAllTagsWithCount } from "../api/tagService";

export function useTags(userId) {

    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTagsWithCount = async () => {
        try {
            setLoading(true);
            const res = await getAllTagsWithCount(userId);
            setTags(res.data.tags);
            return res.data.tags;
        } catch (error) {
            showErrorToast("태그를 불러오는데 실패했습니다.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        tags,
        loading,
        fetchTagsWithCount,
    };
}