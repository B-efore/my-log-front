import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { deletePost, getPost } from "../api/postService";
import Header from "../components/header/Header";
import CommentInput from "../components/CommentInput";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Tag from "../components/Tag/Tag";
import { getProfileImage } from "../util/get-images";
import { formatDate } from "../util/formatDate";
import ConfirmModal from "../components/common/ConfirmModal";
import ToastMessage from "../components/common/ToastMessage";
import { FaUserCircle } from "react-icons/fa";

import "./PostDetail.css"

const PostDetail = () => {

  const navigate = useNavigate();

  const goEdit = () =>
    navigate(`/write/${postId}`, {
      state: {
        post: post,
      }
    }
    );

  const handleDelete = async () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {

    setShowConfirm(false);
    await new Promise(resolve => setTimeout(resolve, 0));

    try {
      await deletePost(postId);
      ToastMessage("게시글이 삭제되었습니다.");
      navigate("/");
    } catch (err) {
      ToastMessage("삭제 과정에서 오류가 발생했습니다.", { type: "error" });
    }
  };

  const location = useLocation();
  const { postId } = useParams();
  const { userId: loggedInUserId } = useAuth();

  const [post, setPost] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!post);

  const [showConfirm, setShowConfirm] = useState(false);

  const isAuthor = post?.user?.userId === loggedInUserId;

  useEffect(() => {
    if (!post) {
      getPost(postId)
        .then((res) => {
          setPost(res.data);
          setLoading(false);
        })
        .catch((err) => {
          ToastMessage("게시글을 불러오는데 실패했습니다.", { type: "error" });
          navigate("/");
        });
    }
  }, [postId]);

  if (loading || !post) {
    return <div className="post-detail">로딩중...</div>
  }

  return (
    <div className="post-detail">
      <Header />
      <div className="post-detail__body">
        <h1 className="post-title">{post.title}</h1>
        <hr className="post-title-underline" />

        <div className="post-meta">
          <span className="post-date">{formatDate(post.createdAt)}</span>
          {isAuthor && (
            <div className="post-actions">
              <button className="edit-btn" onClick={goEdit}>수정</button>
              <button className="delete-btn" onClick={handleDelete}>삭제</button>
              {showConfirm && (
                <ConfirmModal
                  message="정말 이 게시글을 삭제하시겠습니까?"
                  onConfirm={handleConfirmDelete}
                  onCancel={() => setShowConfirm(false)}
                />
              )}
            </div>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag) => (
              <Tag
                key={tag.id} className="tag"
                label={tag.name} />
            ))}
          </div>
        )}

        <ReactMarkdown remarkPlugins={remarkGfm}>{post.content}</ReactMarkdown>

        <div className="post-author">
          <img
            className="author-img"
            src={post.user.profileImageUrl || getProfileImage()}
            alt={`${post.user.username}의 프로필 이미지`}
          />
          <div>
            <div className="author-name">{post.user.username}</div>
            <div className="author-bio">안녕하세요. 테스트 소개입니다.</div>
          </div>
        </div>
      </div>

      <div className="comment-input-section">
      <h3 className="comment-title">댓글 {post.comments.length}</h3>
        <CommentInput className="comment-input-wrapped" postId={postId} onCommentSubmit={(newComment) => {
          setPost((prevPost) => ({
            ...prevPost,
            comments: [...prevPost.comments, newComment],
          }));
        }} />

        {post.comments && post.comments.length > 0 && (
          <div className="comment-section">

            {post.comments.map((comment) => (
              <div key={comment.commentId} className="comment">
                <FaUserCircle className="comment-avatar" />
                <div className="comment-body">
                  <div className="comment-meta">
                    <span className="comment-author">{comment.user.username}</span>
                    <span className="comment-date">{comment.createdAt}</span>
                    {comment.user.userId === loggedInUserId && (
                      <div className="comment-actions">
                        <button className="edit-btn">수정</button>
                        <button className="delete-btn">삭제</button>
                      </div>
                    )}
                  </div>
                  <div className="comment-content">{comment.content}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default PostDetail;