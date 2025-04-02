import React, { useState } from "react";
import { createPost } from "../api/postService";
import Header from "../components/Header";
import PostEditor from "../components/PostEditor";
import MarkdownPreview from "../components/MarkdownPreview";
import PublishModal from "../components/PublishModal";
import "./PostWrite.css";

const PostWrite = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    console.log("임시 저장", { title, content, tags });
  };

  const handlePublish = async (settings) => {

    const requestBody = {
      title,
      content,
      contentPreview: content.slice(0, 100),
      visibility: settings.visibility,
      categoryId: settings.categoryId,
      tagRequests: tags.map((tag) => ({ name: tag })),
      // isPinned: settings.isPinned || false,
    };

    try {
      const response = await createPost(requestBody);
      alert("게시글이 성공적으로 등록되었습니다.");
      setShowModal(false);
    } catch (error) {
      console.error(error.response);
      console.error(error.response?.data);
      alert("게시글 등록 중 오류가 발생했습니다.");
    }
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
                <button className="publish-button" onClick={() => setShowModal(true)}>발행</button>
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

        {showModal && (
        <PublishModal
          onClose={() => setShowModal(false)}
          onSubmit={handlePublish}
        />
      )}

      </div>
  );
};

export default PostWrite;