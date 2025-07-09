import React from "react";
import TagInput from "../tag/TagInput";

const PostEditor = ({
  title,
  content,
  contentPreview,
  tags,
  onChange,
  addTag,
  removeTag
}) => {
  return (
    <div className="flex flex-col flex-1 min-h-0 px-8 py-4 gap-4 overflow-auto w-full">
      <div className="flex flex-col text-left">
        <input
          className="outline-none border-none font-default-bold text-5xl"
          type="text"
          placeholder="제목"
          name="title"
          value={title}
          onChange={onChange}
        />
      </div>

      <hr className="divider" />

      <div className="flex">
        <TagInput tags={tags} onAdd={addTag} onRemove={removeTag} />
      </div>

      <hr className="divider" />

      <div className="flex-1 flex flex-col min-h-0 overflow-auto">
        <textarea
          className="w-full min-h-full resize-none text-base whitespace-normal divide-none outline-none"
          placeholder="본문을 작성해주세요."
          name="content"
          value={content}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PostEditor;