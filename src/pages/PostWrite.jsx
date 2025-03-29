import React, { useState } from "react";
import Header from "../components/Header";
import PostEditor from "../components/PostEditor";
import MarkdownPreview from "../components/MarkdownPreview";
import "./PostWrite.css";

const PostWrite = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const handleSave = () => {
    console.log("임시 저장", { title, content, tags });
  };

  const handlePublish = () => {
    console.log("발행 요청", { title, content, tags });
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="post-editor">

        <Header
            rightChild={
            <>
                <button className="save-button" onClick={handleSave}>저장</button>
                <button className="publish-button" onClick={handlePublish}>발행</button>
            </>
            }
        />

        <div className="post-editor__body">
            <PostEditor
                title={title}
                content={content}
                tags={tags}
                onTitleChange={(e) => setTitle(e.target.value)}
                onContentChange={(e) => setContent(e.target.value)}
                addTag={addTag}
                removeTag={removeTag}
            />

            <MarkdownPreview title={title} content={content} />
        </div>
      </div>
  );
};

export default PostWrite;