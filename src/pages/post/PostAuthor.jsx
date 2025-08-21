import { useNavigate } from "react-router-dom"
import { getProfileImage } from "../../util/get-images";

const PostAuthor = ({ user }) => {

    const navigate = useNavigate();

    return (
        <div className="flex items-center gap-8 py-10 border-t-1 border-gray-300 ">
            <img
                className="profile w-20 sm:w-30 select-none"
                src={getProfileImage(user.imageKey)}
                alt={`${user.username}의 프로필 이미지`}
                onClick={() => navigate(`/${user.userId}`)}
            />
            <div>
                <div className="w-fit font-default-bold text-xl cursor-pointer" onClick={() => navigate(`/${user.userId}`)}>{user.username}</div>
                <div className="w-fit text-base cursor-pointer" onClick={() => navigate(`/${user.userId}`)}>{user.bio}</div>
            </div>
        </div>
    );
};

export default PostAuthor;