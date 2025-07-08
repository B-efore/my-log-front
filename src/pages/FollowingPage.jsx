import { useCallback, useEffect, useState } from "react";
import Header from "../components/header/Header";
import SearchList from "../components/search/SearchList";
import { getFollowings } from "../api/followService";
import { useNavigate, useParams } from "react-router-dom";
import './Follow.css';

const FollowingPage = () => {

    const { userId } = useParams();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchFollowings = useCallback(async () => {
        try {
            const res = await getFollowings(userId);
            setUsers(res.data.follows);
        } catch (err) {
            console.log(err);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchFollowings();
        }
    }, [fetchFollowings]);


    return (
        <div>
            <Header />
            <div className="follow-body">
                {users.length > 0 ?
                    <span className="follow-title">{users.length} 잡았다! 왹토리!</span> :
                    <></>
                }                <SearchList
                    users={users || []}
                    onUserClick={(userId) => navigate(`/${userId}`)}
                    message={"먹이 잡아!"}
                />
            </div>
        </div>
    );
};

export default FollowingPage;