import React from 'react';

const BlogSidebar = ({
    categories,
    tags,
    selectedCategoryId,
    selectedTagIds,
    onCategoryClick,
    onTagClick
}) => {

    return (
        <div className="blog-sidebar-section">
            {categories.length > 0 && (
                <span className="sidebar-title">카테고리</span>
            )}
            <ul className="sidebar-list">
                {categories.map((category) => (
                    <li
                        key={category.categoryId}
                        className={`sidebar-item ${selectedCategoryId === category.categoryId ? "active" : ""}`}
                        onClick={() => onCategoryClick(category.categoryId)}
                    >
                        <span className="sidebar-link">
                            {category.name}
                            {category.postCount >= 0 && <span className="count"> ({category.postCount})</span>}
                        </span>
                    </li>
                ))}
            </ul>
            {tags.length > 0 && (
                <span className="sidebar-title">태그</span>
            )}
            <ul className="sidebar-list">
                {tags.map((tag) => (
                    <li
                        key={tag.id}
                        className={`sidebar-item ${selectedTagIds.includes(tag.id) ? "active" : ""}`}
                        onClick={() => onTagClick(tag.id)}
                    >
                        <span className="sidebar-link">
                            {tag.name}
                            {tag.postCount && <span className="count"> ({tag.postCount})</span>}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BlogSidebar;