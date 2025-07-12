import { useCallback, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import SearchList from "../../components/search/SearchList";
import { getFollowers } from "../../api/followService";
import { useNavigate, useParams } from "react-router-dom";
import './Follow.css';

const FollowerPage = () => {

    const { userId } = useParams();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchFollowings = useCallback(async () => {
        try {
            const res = await getFollowers(userId);
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
            <div className="flex flex-col h-full items-center gap-4 mt-12 mx-8">
                {users.length > 0 ?
                    <span className="follow-title">{users.length} 잡혔다! 왹알!</span> :
                    <></>
                }
                <SearchList
                    users={users || []}
                    onUserClick={(userId) => navigate(`/${userId}`)}
                    message={`위험. 도망!`}
                />
            </div>
        </div>
    );
};

export default FollowerPage;