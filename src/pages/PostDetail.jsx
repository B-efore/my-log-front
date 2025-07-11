import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { deletePost, getPost } from "../api/postService";
import { deleteComment } from "../api/commentService";
import Header from "../components/header/Header";
import CommentInput from "../components/comment/CommentInput";
import Tag from "../components/tag/Tag";
import { formatDate } from "../util/formatDate";
import ConfirmModal from "../components/common/ConfirmModal";
import CommentList from "../components/comment/CommentList";

import { showErrorToast, showSuccessToast } from "../util/toast";
import { getProfileImage } from "../util/get-images";
import MarkdownView from "../components/post/MarkdownView";

const PostDetail = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { postId } = useParams();
  const { userId: loggedInUserId, isLoggedIn } = useAuth();

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
    setComments((prev) => [newComment, ...prev]);
  };

  const handleUpdateComment = (updatedComment) => {
    setComments((prev) =>
      prev.map((c) => (c.commentId === updatedComment.commentId ? updatedComment : c))
    );
    setEditingCommentId(null);
  };

  const handleConfirmDeleteComment = async () => {

    const { targetId } = showCommentConfirm;
    setShowCommentConfirm({ open: false, targetId: null });
    await new Promise(resolve => setTimeout(resolve, 0));

    try {
      await deleteComment(postId, targetId);
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
    return <div>로딩중...</div>
  }

  return (
    <div className="flex flex-col w-full items-center box-border px-8">
      <Header />
      <div className="mt-20 flex flex-col w-full max-w-[720px] text-left">
        <h1 className="font-default-bold text-4xl mb-3">
          {post.title}
        </h1>
        <hr className="border-0.5 border-gray-300 mb-3" />

        <div className="flex flex-row items-center justify-between">
          <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
          {isAuthor && (
            <div className="flex gap-2">
              <button className="btn-small-text" onClick={goEdit}>수정</button>
              <button className="btn-small-text" onClick={handleDeletePost}>삭제</button>
            </div>
          )}
        </div>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap items-center justify-start gap-2 my-2">
            {post.tags.map((tag) => (
              <Tag
                key={tag.id}
                label={tag.name} />
            ))}
          </div>
        )}

        <MarkdownView content={post.content} />

        <div className="flex items-center gap-8 py-20">
          <img
            className="profile"
            src={getProfileImage(post.user.profileImageUrl)}
            alt={`${post.user.username}의 프로필 이미지`}
            onClick={() => navigate(`/${post.user.userId}`)}
          />
          <div>
            <div className="w-fit font-default-bold text-xl cursor-pointer" onClick={() => navigate(`/${post.user.userId}`)}>{post.user.username}</div>
            <div className="w-fit text-base cursor-pointer" onClick={() => navigate(`/${post.user.userId}`)}>{post.user.bio}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full max-w-[720px] mb-8">
        <h3 className="self-start text-base font-default-bold mb-2">댓글 {comments.length}</h3>
        {isLoggedIn && (<CommentInput postId={postId} onCommentSubmit={handleCreateComment} />)}
        {comments.length > 0 && (
          <CommentList
            postId={postId}
            comments={comments}
            loggedInUserId={loggedInUserId}
            editingCommentId={editingCommentId}
            onEditClick={setEditingCommentId}
            onCancelEdit={() => setEditingCommentId(null)}
            onUpdate={handleUpdateComment}
            onDelete={handleDeleteComment}
          />
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