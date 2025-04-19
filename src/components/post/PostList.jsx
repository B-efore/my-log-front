import React from "react";
import "./PostList.css";

const PostList = ({ posts }) => {

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
      };

    return (
        <div className="post-list">
        {posts.map((post) => (
            <div key={post.postId} className="post-item">
            <div className="post-date">{formatDate(post.createdAt)}</div>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-preview">{post.contentPreview}</p>
            </div>
        ))}
        </div>
    );
};

export default PostList;