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
          className="round-box-border p-3 md:p-4 h-[115px] box-border list-none"
        >
          <div className="flex flex-col box-content cursor-pointer">
            <span
              className="font-orbit font-black text-base md:text-xl mb-1 md:mb-2 text-black line-clamp-1"
              onClick={() => navigate(`/posts/${post.postId}`)}
            >
              {post.title}
            </span>
            <p className="text-sm text-gray-600 line-clamp-2">{post.contentPreview}</p>
          </div>
        </li>
      ))}
    </>
  );
};

export default PinnedPostList;