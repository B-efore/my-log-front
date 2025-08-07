import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getPost, updatePost } from "../../api/postService";
import PostEditor from "../../components/post/PostEditor";
import MarkdownPreview from "../../components/post/MarkdownPreview"
import usePost from "../../hooks/usePost";
import ToastMessage from "../../components/common/ToastMessage";
import { useAuth } from "../../context/AuthContext";
import { updateNotice } from "../../api/adminService";
import EditorHeader from "../../components/header/FullHeader";
import { showSuccessToast } from "../../util/toast";
import FullHeader from "../../components/header/FullHeader";
import PostPublishModal from "../../components/post/PostPublishModal";
import { getCategories } from "../../api/categoryService";

const PostEdit = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const postFromState = location.state?.post;

  const { userId, isLoggedIn } = useAuth();
  const { postId } = useParams();
  const { post, setPost, handleChange, addTag, removeTag, validatePost } = usePost();

  const [userCategories, setUserCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!userId) return;

    getCategories(userId).then(setUserCategories).catch(() => {
      setUserCategories([{ categoryId: 0, name: "전체" }]);
    });
  }, [userId]);

  useEffect(() => {

    if (!postFromState) {
      const fetchPost = async () => {
        const res = await getPost(postId);
        setPost({
          title: res.data.title,
          content: res.data.content,
          contentPreview: res.data.contentPreview,
          tags: res.data.tags.map(tag => tag.name),
          categoryId: res.data.category === null ? 0 : res.data.category.categoryId,
          visibility: res.data.visibility,
          pinned: res.data.pinned,
          type: res.data.type,
        });
      }

      if (postId) {
        fetchPost();
      }
    } else {
      setPost({
        title: postFromState.title,
        content: postFromState.content,
        contentPreview: postFromState.contentPreview,
        tags: postFromState.tags.map(tag => tag.name),
        categoryId: postFromState.category === null ? 0 : postFromState.category.categoryId,
        visibility: postFromState.visibility,
        pinned: postFromState.pinned,
        type: postFromState.type,
      });
    }

  }, [postFromState]);

  const handleSave = () => {
    showSuccessToast("준비 중!");
  };

  const handlePublish = async () => {
    const { valid, message } = validatePost();
    if (!valid) {
      alert(message);
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
      type: post.type
    };

    try {

      let response;

      if (post.type === '공지') {
        response = await updateNotice(postId, requestBody);
      } else {
        response = await updatePost(postId, requestBody);
      }

      ToastMessage("게시글이 수정되었습니다.");
      setShowModal(false);

      navigate(`/posts/${postId}`, {
        state: {
          post: response.data,
        }
      });
    } catch (err) {
      console.error(requestBody);
      console.error(err.response?.data);
      ToastMessage("게시글 수정에 실패했습니다.", { type: "error" });
    }
  };

  return (
    <div className="flex flex-col h-screen">

      <FullHeader
        rightChild={
          <>
            <button className="btn-second px-10 py-2" onClick={handleSave}>저장</button>
            <div className="publish-button-wrapper" >
              <button className="btn-primary px-10 py-2" onClick={() => {
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

export default PostEdit;