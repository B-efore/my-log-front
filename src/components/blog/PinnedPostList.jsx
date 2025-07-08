import React from "react";
import { useNavigate } from "react-router-dom";

const PinnedPostList = ({ posts, size }) => {
  const navigate = useNavigate();

  if (!posts || posts.length === 0) return (
    <div><p className="font-alien text-green-700">자랑 필요. 찍어봐!</p></div>
  );

  return (
    <>
      {posts.slice(0, size).map((post, index) => (
        <li
          key={post.postId || index}
          className="round-box-border p-4 h-[115px] box-border list-none"
        >
          <div className="flex flex-col box-content">
            <span
              className="w-fit font-default-bold text-2xl cursor-pointer hover:underline"
              onClick={() => navigate(`/posts/${post.postId}`)}
            >
              {post.title}
            </span>
            <p className="line-clamp-3 text-base w-fit cursor-pointer">{post.contentPreview}</p>
          </div>
        </li>
      ))}
    </>
  );
};

export default PinnedPostList;