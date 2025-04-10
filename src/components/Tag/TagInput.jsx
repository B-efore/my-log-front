import React, { useState } from "react";
import "./TagInput.css"
import Tag from "./Tag";

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

  const handleTagRemove = (index) => {
    onRemove(index);
  }

  return (
    <div className="tags">
      {tags.map((tag, index) => (
        <Tag
          key={`${tag}-${index}`}
          label={tag}
          onClick={() => handleTagRemove(index)}
        />
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