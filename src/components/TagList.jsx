import React from "react";
import "./TagList.css";

const TagList = ({ tags, selected, onSelect }) => {
  return (
    <div className="tag-list">
      <h4 className="title">태그</h4>
      <ul>
        <li
          className={!selected ? "active" : ""}
          onClick={() => onSelect(null)}
        >
          전체보기
        </li>
        {tags.map((tag) => (
          <li
            key={tag.name}
            className={selected === tag.name ? "active" : ""}
            onClick={() => onSelect(tag.name)}
          >
            {tag.name} ({tag.count})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;