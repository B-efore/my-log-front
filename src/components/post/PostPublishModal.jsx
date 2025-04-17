import React, { useEffect, useRef } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import "./PostPublishModal.css";

const PostPublishModal = ({ onClose, onSubmit, handleChange, post, categories }) => {

  const handlePublish = () => {
    onSubmit();
    onClose();
  };

  const modalRef = useRef(null);
  useOutsideClick(modalRef, onClose);

  useEffect(() => {
    if (!post.categoryId && categories.length > 0) {
      handleChange("categoryId", categories[0].categoryId);
    }
  }, [categories]);

  return (
    <div ref={modalRef} className="post-publish-modal">
      <div className="post-publish-modal__section">
        <label htmlFor="category">카테고리</label>
        <select
          value={post.categoryId ?? categories[0]?.categoryId}
          onChange={(e) => handleChange("categoryId", Number(e.target.value))}
        >
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="post-publish-modal__section">
        <label>공개 범위</label>
        <div className="post-publish-modal__visibility-options">
          <button
            className={post.visibility === "공개" ? "active" : ""}
            onClick={() => handleChange("visibility", "공개")}
          >
            전체공개
          </button>
          <button
            className={post.visibility === "비공개" ? "active" : ""}
            onClick={() => handleChange("visibility", "비공개")}
          >
            비공개
          </button>
        </div>
      </div>

      <div className="post-publish-modal__section post-publish-modal__section--pinned">
        <label className="post-publish-modal__pinned-label">
          <input
            type="checkbox"
            checked={post.pinned || false}
            onChange={(e) => handleChange("pinned", e.target.checked)}
          />
          <span>메인글로 등록</span>
        </label>
      </div>

      <div className="post-publish-modal__actions">
        <button onClick={onClose}>취소</button>
        <button onClick={handlePublish}>발행</button>
      </div>
    </div>
  );
};

export default PostPublishModal;
