import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postService";
import { getCategories } from "../api/categoryService";
import Header from "../components/header/Header";
import PostEditor from "../components/post/PostEditor";
import MarkdownPreview from "../components/post/MarkdownPreview";
import PostPublishModal from "../components/post/PostPublishModal";
import usePost from "../hooks/usePost";
import "./PostWrite.css";
import ToastMessage from "../components/common/ToastMessage";

const PostWrite = () => {

  const navigate = useNavigate();
  const { post, handleChange, addTag, removeTag, validatePost } = usePost();
  const [userCategories, setUserCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getCategories().then(setUserCategories).catch(() => {
      setUserCategories([{ categoryId: 0, name: "전체" }]);
    });
  }, []);

  const handleSave = () => {
    console.log("임시 저장", { title, content, tags });
  };

  const handlePublish = async () => {

    const { valid, message } = validatePost();
    if(!valid) {
      ToastMessage(message, { type : "error"});
      return;
    }

    const requestBody = {
      title: post.title,
      content: post.content,
      contentPreview: post.content.slice(0, 100),
      visibility: post.visibility,
      categoryId: post.categoryId,
      tagRequests: post.tags.map((tag) => ({ name: tag })),
      pinned: post.pinned || false,
    };

    try {
      const response = await createPost(requestBody);
      ToastMessage("게시글이 성공적으로 등록되었습니다.");
      setShowModal(false);

      const postId = response.data.postId;
      navigate(`/posts/${postId}`, {
        state: {
          post: response.data,
        }
      });
    } catch (error) {
      console.error(requestBody);
      console.error(error.response?.data);
      ToastMessage("게시글 등록 중 오류가 발생했습니다.", { type : "error"});
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
                    <PostPublishModal
                      onClose={() => setShowModal(false)}
                      onSubmit={handlePublish}
                      handleChange={handleChange}
                      post={post}
                      categories={userCategories}
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