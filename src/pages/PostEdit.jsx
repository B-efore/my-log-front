import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, updatePost } from "../api/postService";
import { getCategories } from "../api/categoryService";
import Header from "../components/header/Header";
import PostEditor from "../components/PostEditor";
import MarkdownPreview from "../components/MarkdownPreview";
import usePost from "../hooks/usePost";
import PostPublishModal from "../components/post/PostPublishModal";
import ToastMessage from "../components/common/ToastMessage";
import "./PostWrite.css";

const PostEdit = () => {
    
    const { postId } = useParams();
    const navigate = useNavigate();

    const { post, setPost, handleChange, addTag, removeTag, validatePost } = usePost();
    const [userCategories, setUserCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(!post);

    useEffect(() => {

        getCategories().then(setUserCategories).catch(() => {
            setUserCategories([{ categoryId: 0, name: "전체" }]);
          });

        getPost(postId)
        .then((res) => {
            setPost({
            title: res.data.title,
            content: res.data.content,
            tags: res.data.tags.map(tag => tag.name),
            categoryId: res.data.category.categoryId,
            visibility: res.data.visibility,
            pinned: res.data.pinned,
            });
            setLoading(false);
        })
        .catch((err) => {
          ToastMessage("게시글을 불러오는데 실패했습니다.", { type : "error"});
        });
      }, [postId, setPost]);

  const handleSave = async () => {
    const { valid, message } = validatePost();
    if (!valid) {
      alert(message);
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
      const response = await updatePost(postId, requestBody);
      ToastMessage("게시글이 수정되었습니다.");
      setShowModal(false);

      console.info(requestBody);
      console.info(response.data);

      navigate(`/posts/${postId}`, {
        state: {
          post: response.data,
        }
      });
    } catch (err) {
      console.error(requestBody);
      console.error(err.response?.data);
      ToastMessage("게시글 수정에 실패했습니다.", { type : "error" });
    }
  };

  if (loading) return <div>불러오는 중...</div>;

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

export default PostEdit;