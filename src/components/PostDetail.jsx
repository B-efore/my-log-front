import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getPost } from "../api/postService";
import Header from "./Header/Header";
import "./PostDetail.css"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Tag from "./Tag/Tag";
import { getProfileImage } from "../util/get-images";

const PostDetail = () => {

  const navigate = useNavigate();

  const goEdit = () => 
    navigate(`/write/${postId}`, {
      state: {
        post: post,
      }
    }
  );

  const location = useLocation();
  const { postId } = useParams();
  const { userId: loggedInUserId } = useAuth();

  const [post, setPost] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!post);

  const isAuthor = post?.user?.id === loggedInUserId;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  useEffect(() => {
    if(!post) {
      getPost(postId)
        .then((res) => {
          setPost(res.data);
          setLoading(false);
        })
        .catch((err) => {
          alert("게시글을 불러오는데 실패했습니다.");
        });
    }
  }, [postId, post]);

  if (loading || !post) {
    return <div className="post-detail">로딩중...</div>
  }

  return (
    <div className="post-detail">
      <Header/>
      <div className="post-detail__body">
        <h1 className="post-title">{post.title}</h1>
        <hr className="post-title-underline" />
      
        <div className="post-meta">
          <span className="post-date">{formatDate(post.createdAt)}</span>
          {isAuthor && (
            <div className="post-actions">
              <button className="edit-btn" onClick={ goEdit }>수정</button>
              <button className="delete-btn">삭제</button>
            </div>
          )}
        </div>

      {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag, idx) => (
              <Tag
                key={idx} className="tag"
                label={tag.name} />
            ))}
          </div>
        )}

      <ReactMarkdown remarkPlugins={remarkGfm}>{post.content}</ReactMarkdown>

        <div className="post-author">
          <img className="author-img" src={post.user.profileImageUrl || getProfileImage()} />
          <div>
            <div className="author-name">{post.user.username}</div>
            <div className="author-bio">안녕하세요. 테스트 소개입니다.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;