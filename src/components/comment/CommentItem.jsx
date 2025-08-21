import React, { useState } from "react";
import CommentInput from "./CommentInput";
import { getProfileImage } from "../../util/get-images";
import { formatDateTime } from "../../util/formatDate";
import { useNavigate } from "react-router-dom";

const CommentItem = ({
  postId,
  comment,
  commentsByParentId,
  loggedInUserId,
  editingCommentId,
  replingCommentId,
  onEditClick,
  onReplyClick,
  onCancelEdit,
  onCreate,
  onUpdate,
  onDelete,
}) => {

  const navigate = useNavigate();

  const isOwner = comment.user.userId === loggedInUserId;
  const isEditing = editingCommentId === comment.commentId;
  const isReplying = replingCommentId === comment.commentId;

  const replies = commentsByParentId.get(comment.commentId) || [];

  return (
    <div className={`flex w-full ${comment.depth > 0 ? 'pr-4 pl-4 md:pl-8' : ''}`}>
      <div className="flex flex-col w-full py-4">
        <div className="flex items-center gap-2">
          <img
            src={getProfileImage(comment.user.imageKey)}
            onClick={() => navigate(`/${comment.user.userId}`)}
            className="profile w-[50px] h-[50px]"
          />
          <div className="flex flex-1 w-full justify-between items-start">
            <div className="flex flex-col text-gray-500">
              <h3 className="font-bold text-black cursor-pointer" onClick={() => navigate(`/${comment.user.userId}`)}>{comment.user.username}</h3>
              <span className="text-sm">{formatDateTime(comment.createdAt)}</span>
            </div>
            {isOwner && !comment.deletedAt && (
              <div className="flex gap-2">
                <button className="btn-small-text" onClick={() => onEditClick(comment.commentId)}>
                  수정
                </button>
                <button className="btn-small-text" onClick={() => onDelete(comment.commentId)}>
                  삭제
                </button>
              </div>
            )}
          </div>
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
          <div className="pt-2 text-base whitespace-pre-wrap">
            {comment.content}
          </div>
        )}

        {!isEditing && !comment.deletedAt && comment.depth < 1 && (
          <button
            className="btn-second round-box-border mb-2 px-2 py-1 btn-small-text text-green-800 w-fit"
            onClick={() => onReplyClick(isReplying ? null : comment.commentId)}
          >
            답글
          </button>
        )}

        {isReplying && (
          <CommentInput
            mode="create"
            postId={postId}
            parentId={comment.commentId}
            onCommentSubmit={onCreate}
          />
        )}

        {replies.length > 0 && (
          <div className="flex flex-col w-full bg-green-50">
            {replies.map(reply => (
              <CommentItem
                postId={postId}
                key={reply.commentId}
                comment={reply}
                commentsByParentId={commentsByParentId}
                loggedInUserId={loggedInUserId}
                editingCommentId={editingCommentId}
                onEditClick={onEditClick}
                replingCommentId={replingCommentId}
                onReplyClick={onReplyClick}
                onCancelEdit={onCancelEdit}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CommentItem;
