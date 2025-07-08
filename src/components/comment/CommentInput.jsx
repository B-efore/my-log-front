import React, { useEffect, useState } from "react";
import { createComment, updateComment } from "../../api/commentService";
import ToastMessage from "../common/ToastMessage";

const CommentInput = ({ postId, onCommentSubmit, mode = "create", initialValue = "", commentId, onCancel }) => {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setContent(initialValue);
    }, [initialValue]);

    const handleSubmit = async () => {
        if (!content.trim()) return;

        setLoading(true);

        try {
            if (mode == "create") {

                const requestBody = {
                    parentId: null,
                    content: content,
                    visibility: "공개",
                };

                const res = await createComment(postId, requestBody);
                onCommentSubmit(res.data);
                setContent("");
            } else {

                const requestBody = {
                    content: content,
                    visibility: "공개",
                };

                const res = await updateComment(postId, commentId, requestBody);
                onCommentSubmit(res.data);
            }
        } catch (err) {
            ToastMessage("댓글 등록에 실패했습니다.", { type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="comment-input">
            <textarea
                className="comment-text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="댓글을 입력하세요"
                rows={3}
                disabled={loading}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
                {mode === "edit" && <button onClick={onCancel}>취소</button>}
                <button onClick={handleSubmit} disabled={loading || !content.trim()}>
                    {mode === "edit" ? "저장" : "등록"}
                </button>
            </div>
        </div>
    );
};

export default CommentInput;