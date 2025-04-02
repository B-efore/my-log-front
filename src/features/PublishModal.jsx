import React, { useState, useEffect } from "react";
import { getCategories } from "../api/categoryService";
import "./PublishModal.css";

const PublishModal = ({ onClose, onSubmit }) => {
  const [category, setCategory] = useState(0);
  const [visibility, setVisibility] = useState("공개");
  const [pinned, setPinned] = useState(false);
  const [userCategories, setUserCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const list = await getCategories();
        const categories = list.length > 0 ? list : [{ categoryId: 0, name: "전체" }];
        setUserCategories(categories);
        setCategory(categories[0].categoryId);
      } catch (error) {
        console.error("카테고리 불러오기 실패:", error);
        setUserCategories([{ categoryId: 0, name: "전체" }]);
        setCategory(0);
      }
    };

    loadCategories();
  }, []);

  const handlePublish = () => {
    onSubmit({ categoryId: category, visibility, pinned: pinned });
    onClose();
  };

  return (
      <div className="modal-box">
        <div className="modal-section">
          <label>카테고리</label>
          <select value={category} onChange={(e) => setCategory(Number(e.target.value))}>
            {userCategories.map((cat) => (
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
              className={visibility === "공개" ? "active" : ""}
              onClick={() => setVisibility("공개")}
            >
              전체공개
            </button>
            <button
              className={visibility === "비공개" ? "active" : ""}
              onClick={() => setVisibility("비공개")}
            >
              비공개
            </button>
          </div>
        </div>

        <div className="modal-section pinned-section">
          <label className="pinned-label">
            <input
              type="checkbox"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
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