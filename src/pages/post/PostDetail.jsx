import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useComments } from "../../hooks/useComments";
import { usePostDetail } from "../../hooks/post/usePostDetail";
import MarkdownView from "../../components/post/MarkdownView";
import CategoryPostList from "./CategoryPostList";
import Pagination from "../../components/pagination/Pagination";
import ConfirmModal from "../../components/common/ConfirmModal";
import CommentList from "../../components/comment/CommentList";
import Header from "../../components/header/Header";
import CommentInput from "../../components/comment/CommentInput";
import PostHeader from "../../components/post/PostHeader";
import PostTags from "../../components/tag/PostTags";
import PostNavigation from "./PostNavigation";
import PostAuthor from "./PostAuthor";
import PostInteractionBar from "../../components/post/PostInteractionBar";

const PostDetail = () => {

  const location = useLocation();
  const { userId: loggedInUserId, isLoggedIn } = useAuth();

  const {
    post,
    loading: postLoading,
    goEdit,
    handleDelete: handleDeletePost,
    showDeleteConfirm: showPostConfirm,
    setShowDeleteConfirm: setShowPostConfirm,
    handleConfirmDelete: handleConfirmDeletePost,
  } = usePostDetail(location.state?.post);

  const {
    comments,
    loading: commentsLoading,
    pagination,
    handlePageChange,
    generatePageNumbers,
    editingCommentId,
    setEditingCommentId,
    replingCommentId,
    setReplingCommentId,
    handleCreate: handleCreateComment,
    handleUpdate: handleUpdateComment,
    handleDelete: handleDeleteComment,
    showDeleteConfirm: showCommentConfirm,
    setShowDeleteConfirm: setShowCommentConfirm,
    handleConfirmDelete: handleConfirmDeleteComment,
  } = useComments(post?.postId);

  const isAuthor = post?.user?.userId === loggedInUserId;

  if (postLoading || !post) {
    return <div>로딩중...</div>
  }

  return (
    <div className="flex flex-col w-full items-center box-border px-4 sm:px-8">
      <Header />

      <div className="mt-20 flex flex-col w-full max-w-[720px] text-left">

        <CategoryPostList
          categoryName={post.category?.name || "미분류"}
          postId={post?.postId}
        />

        <PostHeader
          title={post.title}
          createdAt={post.createdAt}
          views={post.views}
          isAuthor={isAuthor}
          onEdit={goEdit}
          onDelete={handleDeletePost}
        />

        <PostTags
          tags={post.tags}
        />

        <MarkdownView content={post.content} />

        <PostNavigation
          previousPost={post.previousPost}
          nextPost={post.nextPost}
        />

        <PostAuthor
          user={post.user}
        />
      </div>

      <div className="flex flex-col w-full max-w-[720px] mb-8">
        <PostInteractionBar
          postId={post.postId}
          isLoggedIn={isLoggedIn}
          commentsCount={pagination.totalElements}
          onCommentSubmit={handleCreateComment}
        />
        
        {!commentsLoading && (
          <div className="flex flex-col w-full mt-8">
            <CommentList
              postId={post?.postId}
              comments={comments}
              loggedInUserId={loggedInUserId}
              editingCommentId={editingCommentId}
              onEditClick={setEditingCommentId}
              replingCommentId={replingCommentId}
              onReplyClick={setReplingCommentId}
              onCancelEdit={() => setEditingCommentId(null)}
              onCreate={handleCreateComment}
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
            />
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
              generatePageNumbers={generatePageNumbers}
            />
          </div>
        )}
      </div>

      {showPostConfirm && (
        <ConfirmModal
          message="정말 이 게시글을 삭제하시겠습니까?"
          onConfirm={handleConfirmDeletePost}
          onCancel={() => setShowPostConfirm(false)}
        />
      )}

      {showCommentConfirm.open && (
        <ConfirmModal
          message="정말 이 댓글을 삭제하시겠습니까?"
          onConfirm={handleConfirmDeleteComment}
          onCancel={() => setShowCommentConfirm({ open: false, targetId: null })}
        />
      )}

    </div>
  );
};

export default PostDetail;