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
        <div className="text-left flex-1">
            {categories.length > 0 && (
                <strong className="text-base font-default-bold text-violet-500 no-underline">카테고리</strong>
            )}
            <ul className="list-none p-0 mb-12">
                {categories.map((category) => (
                    <li
                        key={category.categoryId}
                        className={`mt-1 cursor-pointer text-sm ${selectedCategoryId === category.categoryId
                            ? "font-default-bold text-violet-500"
                            : "text-inherit"
                            }`}
                        onClick={() => onCategoryClick(category.categoryId)}
                    >
                        <span className="text-inherit no-underline text-sm cursor-pointer hover:text-violet-500">
                            {category.name}
                            {category.postCount >= 0 && <span> ({category.postCount})</span>}
                        </span>
                    </li>
                ))}
            </ul>
            {tags.length > 0 && (
                <strong className="text-base font-default-bold text-violet-500 no-underline">태그</strong>
            )}
            <ul className="list-none p-0 mb-12">
                {tags.map((tag) => (
                    <li
                        key={tag.id}
                        className={`mt-1 cursor-pointer text-sm ${selectedTagIds.includes(tag.id)
                            ? "font-default-bold text-violet-500"
                            : "text-inherit"
                            }`}
                        onClick={() => onTagClick(tag.id)}
                    >
                        <span className="text-inherit no-underline text-sm cursor-pointer hover:text-violet-500">
                            {tag.name}
                            {tag.usageCount && <span> ({tag.usageCount})</span>}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BlogSidebar;