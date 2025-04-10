import React from "react";
import "./CategoryList.css";

const CategoryList = ({ categories, selected, onSelect }) => {
  return (
    <div className="category-list">
      <h4 className="title">카테고리</h4>
      <ul>
        <li
          className={!selected ? "active" : ""}
          onClick={() => onSelect(null)}
        >
          전체보기
        </li>
        {categories.map((cat) => (
          <li
            key={cat.categoryId}
            className={selected === cat.categoryId ? "active" : ""}
            onClick={() => onSelect(cat.categoryId)}
          >
            {cat.name} ({cat.count})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;