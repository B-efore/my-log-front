import React, { useState } from "react";
import "./TagInput.css"
import Tag from "./Tag";

const TagInput = ({ tags = [], onAdd, onRemove }) => {
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);


  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  const handleChange = (e) => setInput(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      if (isComposing) return;
      e.preventDefault();
      onAdd(input.trim());
      setInput("");
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
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
    </div>
  );
};

export default TagInput;