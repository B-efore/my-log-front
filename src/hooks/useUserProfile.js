import { useEffect, useState } from "react";
import { getUserMain } from "../api/userService";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../util/toast";

export function useUserProfile(userId) {
    const [user, setUser] = useState(null);
    const [readme, setReadme] = useState(null);
    const [pinnedPosts, setPinnedPosts] = useState([]);
    const [activityDate, setActivityDate] = useState(null);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {

            if (!userId) return;

            setLoading(true);

            try {
                const res = await getUserMain(userId);

                setUser({
                    userId: res.data.userId,
                    username: res.data.username,
                    bio: res.data.bio,
                    imageKey: res.data.imageKey,
                });
                setReadme(res.data.readme);
                setPinnedPosts(res.data.pinnedPosts);
                setActivityDate(res.data.activities);
            } catch (err) {
                console.log(err);
                showErrorToast("유저 정보를 불러오는데 실패했습니다.");
                navigate(-1);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();

    }, [userId]);

    return { user, readme, pinnedPosts, activityDate, loading };
}