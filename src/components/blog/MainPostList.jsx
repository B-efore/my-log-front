import React from "react";
import { useNavigate } from "react-router-dom";

const MainPostList = ({ posts, size }) => {
  const navigate = useNavigate();

  if (!posts || posts.length === 0) return null;

  return (
    <>
      {posts.slice(0, size).map((post, index) => (
        <li key={post.postId || index} className="home-main-post">
          <div className="home-post-card">
            <span
              className="home-post-card-title"
              onClick={() => navigate(`/posts/${post.postId}`)}
            >
              {post.title}
            </span>
            <p className="home-post-card-content">{post.contentPreview}</p>
          </div>
          <div className="main-post-user">
            <span>{post.user.username}</span>
          </div>
        </li>
      ))}
    </>
  );
};

export default MainPostList;