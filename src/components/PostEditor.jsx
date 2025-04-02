import React from "react";
import TagInput from "./TagInput/TagInput";

const PostEditor = ({
  title,
  content,
  tags,
  onChange,
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
          name="title"
          value={title}
          onChange={onChange}
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
          name="content"
          value={content}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PostEditor;