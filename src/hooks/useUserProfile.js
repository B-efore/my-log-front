import { useEffect, useState } from "react";
import { getUser } from "../api/userService";
import { useNavigate } from "react-router-dom";

export function useUserProfile(userId) {
    const [user, setUser] = useState(null);
    const [pinnedPosts, setPinnedPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await getUser(userId);
                setUser(res.data);
                setPinnedPosts(res.data.pinnedPosts);
            } catch (err) {
                showErrorToast("유저 정보를 불러오는데 실패했습니다.");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        }

    }, [userId]);

    return { user, pinnedPosts, loading };
}