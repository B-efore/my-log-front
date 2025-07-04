import { useEffect, useState } from "react";
import { getUser, getUserActivity } from "../api/userService";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../util/toast";

export function useUserProfile(userId) {
    const [user, setUser] = useState(null);
    const [pinnedPosts, setPinnedPosts] = useState([]);
    const [activityDate, setActivityDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        const today = new Date();
        const past = new Date();
        past.setDate(today.getDate() - 365);

        setStartDate(past);
        setEndDate(today);
    }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {

            if (!userId || !startDate || !endDate) return;

            try {
                setLoading(true);

                const [userRes, activityRes] = await Promise.all([
                    getUser(userId),
                    getUserActivity(userId,
                        startDate.toISOString().split("T")[0],
                        endDate.toISOString().split("T")[0])
                ]);

                setUser(userRes.data);
                setPinnedPosts(userRes.data.pinnedPosts);
                setActivityDate(activityRes.data.activities);
            } catch (err) {
                console.log(err);
                showErrorToast("유저 정보를 불러오는데 실패했습니다.");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();

    }, [userId, startDate, endDate]);

    return { user, pinnedPosts, activityDate, loading };
}