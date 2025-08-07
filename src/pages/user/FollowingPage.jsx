import { useCallback, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import SearchList from "../../components/search/SearchList";
import { getFollowings } from "../../api/followService";
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
            <div className="fixed-w fixed-p flex flex-col h-full items-center gap-4 mt-12 mx-8">
                {users.length > 0 ?
                    <span className="my-8 mx-auto font-orbit text-2xl">{users.length} 잡았다! 왹토리!</span> :
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