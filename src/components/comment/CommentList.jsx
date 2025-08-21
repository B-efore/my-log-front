import React, { useMemo } from "react";
import CommentItem from "./CommentItem";

const CommentList = ({
  postId,
  comments = [],
  loggedInUserId,
  editingCommentId,
  onEditClick,
  replingCommentId,
  onReplyClick,
  onCancelEdit,
  onCreate,
  onUpdate,
  onDelete,
}) => {

  const commentsByParentId = useMemo(() => {
    const group = new Map();
    comments.forEach(comment => {
      const parentId = comment.parentId || 'root';
      if (!group.has(parentId)) {
        group.set(parentId, []);
      }
      group.get(parentId).push(comment);
    });
    return group;
  }, [comments]);

  const rootComments = commentsByParentId.get('root') || [];

  return (
    <div className="flex flex-col divide-y divide-gray-200">
      {rootComments.map((comment) => (
        <CommentItem
          postId={postId}
          key={comment.commentId}
          comment={comment}
          commentsByParentId={commentsByParentId}
          loggedInUserId={loggedInUserId}
          editingCommentId={editingCommentId}
          onEditClick={onEditClick}
          replingCommentId={replingCommentId}
          onReplyClick={onReplyClick}
          onCancelEdit={onCancelEdit}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CommentList;