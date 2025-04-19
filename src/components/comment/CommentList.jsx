import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({
  comments = [],
  loggedInUserId,
  editingCommentId,
  onEditClick,
  onCancelEdit,
  onUpdate,
  onDelete,
}) => {

  return (
    <div className="comment-section">
      {comments.map((comment) => (
        <CommentItem
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