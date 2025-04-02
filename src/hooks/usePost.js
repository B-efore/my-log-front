import { useState } from "react";

const usePost = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTag = (tag) => {
    if (post.tags.length >= 10) return;
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags : [...prev.tags, tag],
    }));
  };

  const removeTag = (indexToRemove) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove),
    }));
  };

  const validatePost = () => {
    if (!post.title.trim()) {
        return { valid: false, message: "제목을 입력해주세요." };
    }
    if (post.title.length > 255) {
        return { valid: false, message: "제목은 255자 이하로 입력해주세요."};
    }
    if (!post.content.trim()) {
        return { valid: false, message: "본문 내용을 작성해주세요." };
    }
    if (post.tags.length > 10) {
        return { valid: false, message: "태그는 최대 10개까지만 입력할 수 있습니다." };
      }
    return { valid: true };
  };

  return {
    post,
    handleChange,
    addTag,
    removeTag,
    validatePost,
  };
};

export default usePost;