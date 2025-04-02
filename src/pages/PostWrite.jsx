import React, { useState } from "react";
import { createPost } from "../api/postService";
import Header from "../components/Header/Header";
import PostEditor from "../components/PostEditor";
import MarkdownPreview from "../components/MarkdownPreview";
import PublishModal from "../features/PublishModal";
import usePost from "../hooks/usePost";
import "./PostWrite.css";

const PostWrite = () => {

  const { post, handleChange, addTag, removeTag, validatePost } = usePost();
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    console.log("임시 저장", { title, content, tags });
  };

  const handlePublish = async (settings) => {

    const { valid, message } = validatePost();
    if(!valid) {
      alert(message);
      return;
    }

    const requestBody = {
      title: post.title,
      content: post.content,
      contentPreview: content.slice(0, 100),
      visibility: settings.visibility,
      categoryId: settings.categoryId,
      tagRequests: post.tags.map((tag) => ({ name: tag })),
      pinned: settings.pinned || false,
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


  return (
    <div className="post-editor">

        <Header
            rightChild={
            <>
                <button className="save-button" onClick={handleSave}>저장</button>
                <div className="publish-button-wrapper" >
                  <button className="publish-button" onClick={() => setShowModal(true)}>발행</button>
                
                  {showModal && (
                    <PublishModal
                      onClose={() => setShowModal(false)}
                      onSubmit={handlePublish}
                    />
                  )}
                </div>
            </>
            }
        />

        <div className="post-editor__body">
            <PostEditor
                title={post.title}
                content={post.content}
                tags={post.tags}
                onChange={handleChange}
                addTag={addTag}
                removeTag={removeTag}
            />

            <MarkdownPreview title={post.title} content={post.content} />
        </div>

        
      </div>
  );
};

export default PostWrite;