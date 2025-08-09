import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/categoryService";
import Header from "../../components/header/Header";
import PostEditor from "../../components/post/PostEditor";
import MarkdownPreview from "../../components/post/MarkdownPreview";
import PostPublishModal from "../../components/post/PostPublishModal";
import usePost from "../../hooks/usePost";
import ToastMessage from "../../components/common/ToastMessage";
import { useAuth } from "../../context/AuthContext";
import { createNotice } from "../../api/adminService";
import FullHeader from "../../components/header/FullHeader";

const NoticeWrite = () => {

  const { userId } = useAuth();
  const navigate = useNavigate();
  const { post, handleChange, addTag, removeTag, validatePost } = usePost();
  const [userCategories, setUserCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!userId) return;
    
    getCategories(userId).then(setUserCategories).catch(() => {
      setUserCategories([{ categoryId: 0, name: "전체" }]);
    });
  }, [userId]);

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
      contentPreview: post.contentPreview,
      visibility: post.visibility,
      categoryId: post.categoryId === 0 ? null : post.categoryId,
      tagRequests: post.tags.map((tag) => ({ name: tag })),
      pinned: post.pinned || false,
      type: '공지',
    };

    try {
      const response = await createNotice(requestBody);
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
    <div className="flex flex-col h-screen">

        <FullHeader
        rightChild={
          <>
            <button className="btn-second px-4 py-1 sm:px-8 sm:py-2" onClick={handleSave}>저장</button>
            <div className="publish-button-wrapper" >
              <button className="btn-primary px-4 py-1 sm:px-8 sm:py-2" onClick={() => {
                handleChange("contentPreview", post.content.slice(0, 100));
                setShowModal(true);
              }}>발행</button>

              {showModal && (
                <PostPublishModal
                  onClose={() => setShowModal(false)}
                  onSubmit={handlePublish}
                  handleChange={handleChange}
                  post={post}
                  categories={userCategories}
                  setCategories={setUserCategories}
                />
              )}
            </div>
          </>
        }
      />

        <div className="flex flex-1 mt-14 min-h-0">
            <PostEditor
                title={post.title}
                content={post.content}
                contentPreview={post.contentPreview}
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

export default NoticeWrite;