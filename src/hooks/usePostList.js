import { useState } from "react";
import { getUserPosts, getPostsByCategoryAndTags } from "../api/postService";
import { showErrorToast } from "../util/toast";

export function usePostList(userId) {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAllPosts = async (page = 0, size = 10) => {
        try {
            setLoading(true);
            const res = await getUserPosts(userId, page, size);
            setPosts(res.data.objects);

            return {
                currentPage: res.data.page + 1,
                size: res.data.size,
                totalPages: res.data.totalPages,
                totalPosts: res.data.totalElements
            };
        } catch (error) {
            showErrorToast("게시글을 불러오는데 실패했습니다.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchPostsWithFilter = async (categoryId = 0, tagIds = []) => {
        try {
            setLoading(true);
            const res = await getPostsByCategoryAndTags(userId, categoryId, tagIds);
            setPosts(res.data.objects);
            
            return {
                currentPage: res.data.page + 1,
                size: res.data.size,
                totalPages: res.data.totalPages,
                totalPosts: res.data.totalElements
            };
        } catch (error) {
            showErrorToast("게시글을 불러오는데 실패했습니다.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        posts,
        loading,
        fetchPostsWithFilter,
        fetchAllPosts
    };
}