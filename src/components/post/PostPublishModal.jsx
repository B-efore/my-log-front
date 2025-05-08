import React, { useState, useEffect, useRef } from "react";
import { createCategory } from "../../api/categoryService";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import "./PostPublishModal.css";
import { showErrorToast } from "../../util/toast";

const PostPublishModal = ({ onClose, onSubmit, handleChange, post, categories, setCategories }) => {

  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handlePublish = () => {
    onSubmit();
    onClose();
  };

  const handleAddCategory = async () => {

    if (!newCategoryName.trim()) return;

    try {
      const requestBody = {
        name: newCategoryName,
      };
      const response = await createCategory(requestBody);

      if (response.status == 201) {
        const newCategory = response.data;
        setCategories((prev) => [...prev, newCategory]);
        // handleChange("categoryId", newCategory.categoryId);
        setNewCategoryName("");
        setShowCategoryInput(false);
      }
    } catch (error) {
      console.error("카테고리 생성 실패: ", error);
      showErrorToast("카테고리 생성에 실패했습니다.");
    }
  }

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
        {!showCategoryInput ? (
          <button className="category-btn" onClick={() => setShowCategoryInput(true)}>
            + 카테고리 추가
          </button>
        ) : (
          <div className="category-add-form">
            <input
              type="text"
              className="category-add-input"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="새 카테고리 이름"
            />
            <div className="category-add-buttons">
              <button
                type="button"
                className="category-confirm-btn"
                onClick={handleAddCategory}
              >
                확인
              </button>
              <button
                type="button"
                className="category-cancel-btn"
                onClick={() => {
                  setNewCategoryName("");
                  setShowCategoryInput(false);
                }}
              >
                취소
              </button>
            </div>
          </div>

        )}

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
