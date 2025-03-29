import React, { useState } from "react";
import TagInput from "./TagInput";

const PostEditor = ({
  title,
  content,
  tags,
  onTitleChange,
  onContentChange,
  addTag,
  removeTag
}) => {

  return (
    <div className="post-editor__left">
      <div className="editor">
        <input
          className="title"
          type="text"
          placeholder="제목"
          value={title}
          onChange={onTitleChange}
        />
      </div>

      <hr className="divider" />

      <div className="editor">
        <TagInput tags={tags} onAdd={addTag} onRemove={removeTag} />
      </div>

      <hr className="divider" />

      <div className="editor">
        <textarea
          className="content"
          placeholder="본문을 작성해주세요."
          value={content}
          onChange={onContentChange}
        />
      </div>
    </div>
  );
};

export default PostEditor;