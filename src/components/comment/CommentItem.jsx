import React from "react";
import CommentInput from "./CommentInput";
import { getProfileImage } from "../../util/get-images";

const CommentItem = ({
  postId,
  comment,
  loggedInUserId,
  editingCommentId,
  onEditClick,
  onCancelEdit,
  onUpdate,
  onDelete,
}) => {
    
  const isOwner = comment.user.userId === loggedInUserId;
  const isEditing = editingCommentId === comment.commentId;

  return (
    <div className="comment">
      <img
        src={getProfileImage(comment.user.profileImageUrl)}
        className="w-[50px] h-[50px] rounded-full"
      />
      <div className="comment-body">
        <div className="comment-meta">
          <span className="comment-author">{comment.user.username}</span>
          <span className="comment-date">{comment.createdAt}</span>
          {isOwner && !comment.deletedAt && (
            <div className="comment-actions">
              <button className="edit-btn" onClick={() => onEditClick(comment.commentId)}>
                수정
              </button>
              <button className="delete-btn" onClick={() => onDelete(comment.commentId)}>
                삭제
              </button>
            </div>
          )}
        </div>
        {isEditing ? (
          <CommentInput
            mode="edit"
            postId={postId}
            commentId={comment.commentId}
            initialValue={comment.content}
            onCommentSubmit={onUpdate}
            onCancel={onCancelEdit}
          />
        ) : (
          <div className="comment-content">
            {comment.deletedAt ? "삭제된 댓글입니다." : comment.content}
            </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
