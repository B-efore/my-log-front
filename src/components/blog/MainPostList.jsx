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
    <div className="grid-body">
      {posts.map((post) => (
        <div
          key={post.postId}
          className="round-box-border card-box"
          onClick={() => navigate(`/posts/${post.postId}`)}
        >
          <h2 className="font-orbit card-title">
            {post.title}
          </h2>

          <p className="card-content">
            {post.contentPreview}
          </p>

          <div className="flex items-center gap-2 mt-auto pt-3 sm:pt-4">
            <img
              src={getProfileImage(post.user?.imageKey)}
              alt="작성자"
              className="profile w-5 h-5 sm:w-6 sm:h-6 round-box-border rounded-full flex-shrink-0"
            />
            <span className="card-under-left-text">{post.user?.username || '외계인? 이거 그런 거 아닌데요'}</span>
            <span className="card-under-right-text">
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPostList;