import React from "react";
import { useNavigate } from "react-router-dom";
import { getProfileImage } from "../../util/get-images";

const MainPostList = ({ posts }) => {

  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full auto-rows-[1fr]grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full auto-rows-[1fr]">
      {posts.map((post) => (
        <div
          key={post.postId}
          className="flex flex-col h-full min-h-[180px] sm:min-h-[200px] round-box-border p-4 sm:p-5 text-left cursor-pointer hover:shadow-sm transition-shadow bg-white"
          onClick={() => navigate(`/posts/${post.postId}`)}
        >
          <h2 className="text-lg sm:text-xl font-default-bold mb-2 text-black line-clamp-2 sm:line-clamp-1">
            {post.title}
          </h2>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2 sm:line-clamp-3">
            {post.contentPreview}
          </p>

          <div className="flex items-center gap-2 mt-auto pt-3 sm:pt-4">
            <img
              src={getProfileImage(post.user?.imageKey)}
              alt="작성자"
              className="profile w-5 h-5 sm:w-6 sm:h-6 rounded-full round-box-border flex-shrink-0"
            />
            <span className="text-xs sm:text-sm text-gray-500 truncate">{post.user?.username || '외계인? 이거 그런 거 아닌데요'}</span>
            <span className="text-xs text-gray-500 ml-auto flex-shrink-0">
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPostList;