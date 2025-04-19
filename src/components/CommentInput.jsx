import React, { useState } from "react";
import { createComment } from "../api/commentService";
import ToastMessage from "./common/ToastMessage";

const CommentInput = ({ postId, onCommentSubmit }) => {
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!content.trim()) return;

        setSubmitting(true);

        const requestBody = {
            postId: postId,
            parentId: null,
            content: content,
            visibility: "공개",
        };

        console.log(requestBody);

        try {
            const res = await createComment(requestBody);
            onCommentSubmit(res.data);
            setContent("");
        } catch (err) {
            ToastMessage("댓글 등록에 실패했습니다.", { type : "error"});
        } finally {
            setSubmitting(false);
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
                disabled={submitting}
            />
            <button
                onClick={handleSubmit}
                disabled={!content.trim() || submitting}
            >
                등록
            </button>
        </div>
    );
};

export default CommentInput;