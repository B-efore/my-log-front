import { getProfileImage } from "../util/get-images";
import { useNavigate } from "react-router-dom";

const TopUsers = ({ users }) => {

  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto select-none font-orbit">
      <h2
        className="text-green-800 mb-4 text-left font-black text-sm sm:text-base md:text-lg"
      >
        * 이주의 멋진 외계인 ᕙ༼◕ ᴥ ◕༽ᕗ
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, idx) => {
          const user = users[idx];
          return user ? (
            <div
              key={user.userId}
              onClick={() => navigate(`/${user.userId}`)}
              className="cursor-pointer bg-white round-box-border hover:shadow-sm p-4 flex flex-col items-center text-center"
            >
              <img
                src={getProfileImage(user.imageKey)}
                alt={user.username}
                className="profile w-30 h-30 round-box-border rounded-full mb-4"
              />
              <span className="w-10 h-10 rounded-full bg-green-600 text-white text-lg flex items-center justify-center mb-4">
                {idx + 1}
              </span>
              <div className="mb-4 text-base text-gray-800">
                <span className="font-black text-lg text-black">{user.username}</span>
                <p>수집한 외계 {user.createdPosts}</p>
                <p>달았다 댓글 {user.createdComments}</p>
                <p>받았다 댓글 {user.receivedComments}</p>
                <p>먹은 푸딩 {user.receivedLikes}</p>
              </div>
            </div>
          ) : (
            <div
              key={`empty-${idx}`}
              className="bg-gray-100 text-gray-500 p-4 flex flex-col items-center justify-center text-center round-box-border"
            >
              <p className="text-base">다음은 너? ヽ(•̀ω•́ )ゝ</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopUsers;