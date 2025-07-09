import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({
  postId,
  comments = [],
  loggedInUserId,
  editingCommentId,
  onEditClick,
  onCancelEdit,
  onUpdate,
  onDelete,
}) => {

  return (
    <div className="flex flex-col w-full max-w-[720px] mt-8">
      {comments.map((comment) => (
        <CommentItem
          postId={postId}
          key={comment.commentId}
          comment={comment}
          loggedInUserId={loggedInUserId}
          editingCommentId={editingCommentId}
          onEditClick={onEditClick}
          onCancelEdit={onCancelEdit}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CommentList;