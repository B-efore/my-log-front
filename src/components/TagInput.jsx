import React, { useState } from "react";
import "./TagInput.css";

const TagInput = ({ tags = [], onAdd, onRemove }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => setInput(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      onAdd(input.trim());
      setInput("");
      e.preventDefault();
    }
  };

  return (
    <div className="tags">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="tag"
          onClick={() => onRemove(index)}
          title="클릭해서 삭제"
        >
          {tag}
        </div>
      ))}
      <input
        className="tag-input"
        type="text"
        placeholder="Enter를 입력해 태그를 추가하세요."
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default TagInput;