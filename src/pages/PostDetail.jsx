import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { deletePost, getPost } from "../api/postService";
import { deleteComment } from "../api/commentService";
import Header from "../components/header/Header";
import CommentInput from "../components/comment/CommentInput";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Tag from "../components/Tag/Tag";
import { getProfileImage } from "../util/get-images";
import { formatDate } from "../util/formatDate";
import ConfirmModal from "../components/common/ConfirmModal";
import CommentList from "../components/comment/CommentList";

import "./PostDetail.css"
import { showErrorToast, showSuccessToast } from "../util/toast";

const PostDetail = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { postId } = useParams();
  const { userId: loggedInUserId } = useAuth();

  const [post, setPost] = useState(location.state?.post || null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(!post);
  const [editingCommentId, setEditingCommentId] = useState(null);

  const [showPostConfirm, setShowPostConfirm] = useState(false);
  const [showCommentConfirm, setShowCommentConfirm] = useState({ open: false, targetId: null });

  const isAuthor = post?.user?.userId === loggedInUserId;

  const goEdit = () =>
    navigate(`/write/${postId}`, {
      state: {
        post: post,
      }
    }
    );

  const handleDeletePost = async () => {
    setShowPostConfirm(true);
  };

  const handleConfirmDeletePost = async () => {

    setShowPostConfirm(false);
    await new Promise(resolve => setTimeout(resolve, 0));

    try {
      await deletePost(postId);
      showSuccessToast("게시글이 삭제되었습니다.");
      navigate("/");
    } catch (err) {
      showErrorToast("게사글 삭제 과정에서 오류가 발생했습니다.");
    }
  };

  const handleDeleteComment = (commentId) => {
    setShowCommentConfirm({ open: true, targetId: commentId });
  };


  const handleCreateComment = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const handleUpdateComment = (updatedComment) => {
    setComments((prev) =>
      prev.map((c) => (c.commentId === updatedComment.commentId ? updatedComment : c))
    );
    setEditingCommentId(null);
  };

  // TO-DO: 삭제된 댓글은 수정/삭제 버튼 안보이게 변경해야 함
  const handleConfirmDeleteComment = async () => {

    const { targetId } = showCommentConfirm;
    setShowCommentConfirm({ open: false, targetId: null });
    await new Promise(resolve => setTimeout(resolve, 0));

    try {
      await deleteComment(targetId);
      setComments((prev) =>
        prev.map((c) =>
          c.commentId === targetId ? { ...c, content: "삭제된 댓글입니다." } : c
        )
      );
      showSuccessToast("댓글이 삭제되었습니다.");
    } catch {
      showErrorToast("댓글 삭제 과정에서 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (!post) {
      getPost(postId)
        .then((res) => {
          setPost(res.data);
          setComments(res.data.comments)
          setLoading(false);
        })
        .catch((err) => {
          showErrorToast("게시글을 불러오는데 실패했습니다.");
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
              <button className="delete-btn" onClick={handleDeletePost}>삭제</button>
            </div>
          )}
        </div>

        {post.tags?.length > 0 && (
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
        <h3 className="comment-title">댓글 {comments.length}</h3>
        <CommentInput className="comment-input-wrapped" postId={postId} onCommentSubmit={handleCreateComment} />
        {comments.length > 0 && (
          <div className="comment-section">
            <CommentList
              comments={comments}
              loggedInUserId={loggedInUserId}
              editingCommentId={editingCommentId}
              onEditClick={setEditingCommentId}
              onCancelEdit={() => setEditingCommentId(null)}
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
            />
          </div>
        )}
      </div>

      {showPostConfirm && (
        <ConfirmModal
          message="정말 이 게시글을 삭제하시겠습니까?"
          onConfirm={handleConfirmDeletePost}
          onCancel={() => setShowPostConfirm(false)}
        />
      )}

      {showCommentConfirm.open && (
        <ConfirmModal
          message="정말 이 댓글을 삭제하시겠습니까?"
          onConfirm={handleConfirmDeleteComment}
          onCancel={() => setShowCommentConfirm({ open: false, targetId: null })}
        />
      )}

    </div>
  );
};

export default PostDetail;