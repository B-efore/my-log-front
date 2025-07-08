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
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 w-full auto-rows-[1fr]">
      {posts.map((post) => (
        <div
          key={post.postId}
          className="flex flex-col h-full min-h-[200px] round-box-border p-5 text-left cursor-pointer hover:shadow-sm transition-shadow bg-white"
          onClick={() => navigate(`/posts/${post.postId}`)}
        >
          <h2 className="text-xl font-default-bold mb-2 text-black line-clamp-1">
            {post.title}
          </h2>

          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {post.contentPreview}
          </p>

          <div className="flex items-center gap-2 mt-auto pt-4">
            <img
              src={getProfileImage(post.user.profileImageUrl)}
              alt="작성자"
              className="w-6 h-6 rounded-full object-contain border-2 border-gray-300"
            />
            <span className="text-sm text-gray-500">{post.user.username}</span>
            <span className="text-xs text-gray-500 ml-auto">
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPostList;