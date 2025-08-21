import React, { useEffect, useState } from "react";
import { createComment, updateComment } from "../../api/commentService";
import ToastMessage from "../common/ToastMessage";
import { useAuth } from "../../context/AuthContext";

const CommentInput = ({ 
    postId, 
    onCommentSubmit, 
    mode = "create", 
    initialValue = "", 
    commentId,
    parentId = null,
    onCancel }) => {

    const {isLoggedIn} = useAuth();
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
                    parentId: parentId,
                    content: content,
                    visibility: "공개",
                };

                const res = await createComment(postId, requestBody);
                onCommentSubmit(res.data);
                setContent("");
            } else {

                const requestBody = {
                    parentId: parentId,
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
        <div className="flex flex-col w-full max-w-[720px]">
            <textarea
                className="round-box-border w-full px-5 py-4 outline-none box-border resize-none bg-white"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={isLoggedIn ? `댓글을 입력하세요` : `로그인 후 이용 가능합니다.`}
                rows={3}
                disabled={loading || !isLoggedIn}
            />
            <div 
                className="flex justify-end gap-2 mt-2"
                >
                {mode === "edit" && 
                <button className="btn-second px-5 py-2" onClick={onCancel}>
                    취소
                </button>}
                <button
                    className="btn-primary px-5 py-2 disabled:bg-gray-300"
                    onClick={handleSubmit}
                    disabled={loading || !isLoggedIn || !content.trim()}
                >
                    {mode === "edit" ? "저장" : "등록"}
                </button>
            </div>
        </div>
    );
};

export default CommentInput;