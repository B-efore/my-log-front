import { useCallback, useEffect, useState } from "react";
import { deleteComment, getComments } from "../api/commentService";
import { usePagination } from "./usePagination";
import { showErrorToast, showSuccessToast } from "../util/toast";

export const useComments = (postId) => {

  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [replingCommentId, setReplingCommentId] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState({ open: false, targetId: null });

  const { pagination, updatePagination, handlePageChange, generatePageNumbers } = usePagination();

  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async (page, size) => {
    setLoading(true);
    try {
      const res = await getComments(postId, page, size);
      setComments(res.data.objects);
      updatePagination(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [postId, updatePagination]);

  useEffect(() => {
    if (!postId) return;

    fetchComments(pagination.currentPage, 15);
  }, [postId, pagination.currentPage]);

  const handleCreate = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  const handleUpdate = (updatedComment) => {
    setComments((prev) =>
      prev.map((c) => (c.commentId === updatedComment.commentId ? updatedComment : c))
    );
    setEditingCommentId(null);
  };
  
  const handleDelete = (commentId) => {
    setShowDeleteConfirm({ open: true, targetId: commentId });
  };
  
  const handleConfirmDelete = async () => {
    const { targetId } = showDeleteConfirm;
    setShowDeleteConfirm({ open: false, targetId: null });
    try {
      await deleteComment(postId, targetId);
      setComments((prev) =>
        prev.map((c) =>
          c.commentId === targetId ? { ...c, content: "삭제된 댓글입니다.", deletedAt: new Date().toISOString() } : c
        )
      );
      showSuccessToast("댓글이 삭제되었습니다.");
    } catch {
      showErrorToast("댓글 삭제 과정에서 오류가 발생했습니다.");
    }
  };

  return {
    comments,
    loading,
    pagination,
    handlePageChange,
    generatePageNumbers,
    editingCommentId,
    setEditingCommentId,
    replingCommentId,
    setReplingCommentId,
    handleCreate,
    handleUpdate,
    handleDelete,
    showDeleteConfirm,
    setShowDeleteConfirm,
    handleConfirmDelete,
  };
};