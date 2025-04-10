import React, { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import TagList from "./TagList";
import PostList from "./PostList";
import "./PostListPage.css";
import { getCategories, getTags, getPosts } from "../api/postService";

const PostListPage = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCategories().then(setCategories);
    // getTags().then(setTags);
  }, []);

  useEffect(() => {
    getPosts({ category: selectedCategory, tag: selectedTag, page })
      .then((res) => setPosts(res.data));
  }, [selectedCategory, selectedTag, page]);

  return (
    <div className="post-list-page">
      <div className="sidebar">
        <CategoryList 
          categories={categories} 
          selected={selectedCategory} 
          onSelect={setSelectedCategory} 
        />
        {/* <TagList 
          tags={tags} 
          selected={selectedTag} 
          onSelect={setSelectedTag} 
        /> */}
      </div>
      <div className="main-content">
        <PostList posts={posts} />
        {/* 페이지네이션 컴포넌트 나중에 추가 */}
      </div>
    </div>
  );
};

export default PostListPage;