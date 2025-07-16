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
    <div className="flex gap-4 mb-8">
      <img
        src={getProfileImage(comment.user.imageKey)}
        className="profile w-[50px] h-[50px]"
      />
      <div className="flex-1 text-left">
        <div className="flex text-sm text-gray-500 mb-1 gap-2">
          <span className="font-default-bold text-black">{comment.user.username}</span>
          <span>{comment.createdAt}</span>
          {isOwner && !comment.deletedAt && (
            <div className="flex ml-auto gap-2">
              <button className="btn-small-text" onClick={() => onEditClick(comment.commentId)}>
                수정
              </button>
              <button className="btn-small-text" onClick={() => onDelete(comment.commentId)}>
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
          <div className="text-base whitespace-pre-wrap">
            {comment.deletedAt ? "삭제된 댓글입니다." : comment.content}
            </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
