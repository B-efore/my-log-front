import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPost } from "../../api/postService";
import { showErrorToast, showSuccessToast } from "../../util/toast";

export const usePostDetail = (initialPost) => {

    const navigate = useNavigate();
    const { postId } = useParams();

    const [post, setPost] = useState(initialPost || null);
    const [loading, setLoading] = useState(!initialPost);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (!postId) return;

        getPost(postId)
            .then((res) => setPost(res.data))
            .catch(() => {
                showErrorToast("게시글을 불러오는데 실패했습니다.");
                navigate("/");
            })
            .finally(() => setLoading(false));

    }, [postId, navigate]);

    const goEdit = () => navigate(`/write/${postId}`, { state: { post } });

    const handleDelete = () => setShowDeleteConfirm(true);

    const handleConfirmDelete = async () => {
        setShowDeleteConfirm(false);

        try {
            await deletePost(postId);
            showSuccessToast("게시글이 삭제되었습니다.");
            navigate("/");
        } catch (err) {
            showErrorToast("게시글 삭제 과정에서 오류가 발생했습니다.");
        }
    };

    return {
        post,
        loading,
        goEdit,
        handleDelete,
        showDeleteConfirm,
        setShowDeleteConfirm,
        handleConfirmDelete,
    };
};