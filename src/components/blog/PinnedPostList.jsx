import React from "react";
import { useNavigate } from "react-router-dom";

const PinnedPostList = ({ posts, size }) => {
  const navigate = useNavigate();

  if (!posts || posts.length === 0) return null;

  return (
    <>
      {posts.slice(0, size).map((post, index) => (
        <li key={post.postId || index} className="main-post">
          <div className="post-card">
            <span
              className="post-card-title"
              onClick={() => navigate(`/posts/${post.postId}`)}
            >
              {post.title}
            </span>
            <p className="post-card-content">{post.contentPreview}</p>
          </div>
        </li>
      ))}
    </>
  );
};

export default PinnedPostList;