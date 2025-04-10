import React, { useEffect } from "react";
import "./PublishModal.css";

const PublishModal = ({ onClose, onSubmit, handleChange, post, categories }) => {

  const handlePublish = () => {
    onSubmit();
    onClose();
  };

  useEffect(() => {
    if (!post.categoryId && categories.length > 0) {
      handleChange("categoryId", categories[0].categoryId);
    }
  }, [categories]);

  return (
    <div className="modal-box">
      <div className="modal-section">
        <label>카테고리</label>
        <select
          value={post.categoryId || 1}
          onChange={(e) => handleChange("categoryId", Number(e.target.value))}
        >
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="modal-section">
        <label>공개 범위</label>
        <div className="visibility-options">
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

      <div className="modal-section pinned-section">
        <label className="pinned-label">
          <input
            type="checkbox"
            checked={post.pinned || false}
            onChange={(e) => handleChange("pinned", e.target.checked)}
          />
          <span>메인글로 등록</span>
        </label>
      </div>

      <div className="modal-actions">
        <button onClick={onClose}>취소</button>
        <button onClick={handlePublish}>발행</button>
      </div>
    </div>
  );
};

export default PublishModal;
