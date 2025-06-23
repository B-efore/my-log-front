import { usePostList } from "./usePostList";
import { useUserProfile } from "./useUserProfile";

export function useBlog(userId) {
    const { user, pinnedPosts, loading: userLoading } = useUserProfile(userId);
    const { } = usePostList();
}