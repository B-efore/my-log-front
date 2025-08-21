import { usePostList } from "./post/usePostList";
import { useUserProfile } from "./useUserProfile";

export function useBlog(userId) {
    const { user, pinnedPosts, loading: userLoading } = useUserProfile(userId);
    const { } = usePostList();
}