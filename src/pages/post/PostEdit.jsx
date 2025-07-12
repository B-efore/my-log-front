import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getPost, updatePost } from "../../api/postService";
import { getCategories } from "../../api/categoryService";
import Header from "../../components/header/Header";
import PostEditor from "../../components/post/PostEditor";
import MarkdownPreview from "../../components/post/MarkdownPreview"
import usePost from "../../hooks/usePost";
import PostPublishModal from "../../components/post/PostPublishModal";
import ToastMessage from "../../components/common/ToastMessage";
import { useAuth } from "../../context/AuthContext";
import { updateNotice } from "../../api/adminService";

const PostEdit = () => {

  const location = useLocation();
  const postFromState = location.state?.post;

  const { userId } = useAuth();
  const { postId } = useParams();
  const navigate = useNavigate();

  const { post, setPost, handleChange, addTag, removeTag, validatePost } = usePost();
  const [userCategories, setUserCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(!post);

  useEffect(() => {
    if (userId) {
      getCategories(userId)
        .then((categories) => {
          setUserCategories(categories)
        })
        .catch((err) => {
          console.err(err);
        });
    }
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
      });
    }

  }, [postFromState]);

  const handleSave = async () => {
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
    };

    try {

      let response;

      if (post.isNotice) {
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

  if (loading) return <div>불러오는 중...</div>;

  return (
    <div className="flex flex-col h-screen">

      <Header
        rightChild={
          <>
            <button className="btn-second px-10 py-2" >저장</button>
            <div className="publish-button-wrapper" >
              <button className="btn-primary px-10 py-2" onClick={() => {
                handleChange("contentPreview", post.contentPreview);
                setShowModal(true);
              }}>발행</button>

              {showModal && (
                <PostPublishModal
                  onClose={() => setShowModal(false)}
                  onSubmit={handleSave}
                  handleChange={handleChange}
                  post={post}
                  categories={userCategories}
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