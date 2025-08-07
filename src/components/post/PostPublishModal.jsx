import React, { useState, useEffect, useRef } from "react";
import { createCategory } from "../../api/categoryService";
import { useOutsideClick } from "../../hooks/useOutsideClick";
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
    <div ref={modalRef} className="absolute top-[120%] right-[0] z-[10] w-fit min-w-[300px] sm:min-w-[400px] p-4 mr-3 sm:p-8 sm:mr-6 shadow-sm round-box-border bg-white box-border">

      <div className="flex flex-col text-left">
        <label className="text-base mb-2" htmlFor="content-preview"> 요약글
        </label>
        <input
          className="w-full flex-2 py-2 round-box-border input-form"
          id="preview"
          name="preview"
          type="text"
          placeholder="내용 요약"
          value={post.contentPreview}
          onChange={(e) => handleChange("contentPreview", e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col text-left mt-4">
        <label className="text-base mb-2" htmlFor="category">카테고리</label>
        <select
          className="round-box-border outline-none p-2"
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
          <button className="text-end text-sm text-gray-500" onClick={() => setShowCategoryInput(true)}>
            + 카테고리 추가
          </button>
        ) : (
          <div className="flex w-full gap-2 mt-2">
            <input
              type="text"
              className="w-full flex-2 py-2 round-box-border input-form"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="새 카테고리 이름"
            />
            <div className="flex flex-row gap-2">
              <button
                type="button"
                className="flex-1 p-2 round-box-border cursor-pointer transition-colors hover:bg-green-50"
                onClick={handleAddCategory}
              >
                확인
              </button>
              <button
                type="button"
                className="flex-1 p-2 round-box-border cursor-pointer transition-colors hover:bg-green-50"
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

      <div className="text-left flex-col mt-8">
        <label className="text-base">공개 범위</label>
        <div className="flex gap-4 my-2">
          <button
            className={post.visibility === "공개" ? "btn-primary flex-1 p-2" : "btn-second flex-1 p-2"}
            onClick={() => handleChange("visibility", "공개")}
          >
            전체공개
          </button>
          <button
            className={post.visibility === "비공개" ? "btn-primary flex-1 p-2" : "btn-second flex-1 p-2"}
            onClick={() => handleChange("visibility", "비공개")}
          >
            비공개
          </button>
        </div>
      </div>

      <div className="flex">
        <label className="flex gap-1.5">
          <input
            type="checkbox"
            checked={post.pinned || false}
            onChange={(e) => handleChange("pinned", e.target.checked)}
          />
          <span className="text-sm text-gray-800">메인글로 등록</span>
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <button className="btn-second px-6 py-2" onClick={onClose}>취소</button>
        <button className="btn-primary px-6 py-2" onClick={handlePublish}>발행</button>
      </div>
    </div>
  );
};

export default PostPublishModal;
