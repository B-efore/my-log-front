import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../util/formatDate";
import { getLikeAlien, getProfileImage } from "../../util/get-images";
import { useLike } from "../../hooks/useLike";
import { useComments } from "../../hooks/useComments";
import { usePostDetail } from "../../hooks/post/usePostDetail";
import MarkdownView from "../../components/post/MarkdownView";
import CategoryPostList from "./CategoryPostList";
import Pagination from "../../components/pagination/Pagination";
import ConfirmModal from "../../components/common/ConfirmModal";
import CommentList from "../../components/comment/CommentList";
import Header from "../../components/header/Header";
import CommentInput from "../../components/comment/CommentInput";
import Tag from "../../components/tag/Tag";

const PostDetail = () => {

  const navigate = useNavigate();
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
    isLiked,
    likeCount,
    handleLike,
    handleUnlike } = useLike(post?.postId, isLoggedIn);

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

        <h1 className="font-orbit font-black text-4xl mb-4">
          {post.title}
        </h1>
        <hr className="border-0.5 border-gray-300 mb-4" />

        <div className="flex flex-row items-center justify-between">
          <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
          {isAuthor ? (
            <div className="flex gap-2">
              <p className="text-sm text-gray-500">응시하다... 총 {post.views}의 눈</p>
              <button className="btn-small-text" onClick={goEdit}>수정</button>
              <button className="btn-small-text" onClick={handleDeletePost}>삭제</button>
            </div>
          ) : (
            <div className="flex">
              <p className="text-sm text-gray-500">응시하다... 총 {post.views}의 눈</p>
            </div>
          )}
        </div>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap items-center justify-start gap-2 my-2">
            {post.tags.map((tag) => (
              <Tag
                key={tag.tagId}
                label={tag.name} />
            ))}
          </div>
        )}

        <MarkdownView content={post.content} />

        <div className="flex justify-between my-4 gap-4 select-none">
          {post.previousPost && (
            <button
              className="mr-auto w-1/2 sm:w-1/3 px-4 py-2 btn-second round-box-border border-green-600 single-line-ellipsis text-center flex items-center justify-start gap-2"
              onClick={() => navigate(`/posts/${post.previousPost?.postId}`)}
            >
              <span className="text-xs">이전</span>
              <span className="truncate">{post.previousPost?.title}</span>
            </button>
          )}
          {post.nextPost && (
            <button
              className="ml-auto w-1/2 sm:w-1/3 px-4 py-2 btn-second round-box-border border-green-600 single-line-ellipsis text-center flex items-center justify-end gap-2"
              onClick={() => navigate(`/posts/${post.nextPost?.postId}`)}
            >
              <span className="truncate">{post.nextPost?.title}</span>
              <span className="text-xs">다음</span>
            </button>
          )
          }
        </div>


        <div className="flex items-center gap-8 py-10 border-t-1 border-gray-300 ">
          <img
            className="profile select-none"
            src={getProfileImage(post.user.imageKey)}
            alt={`${post.user.username}의 프로필 이미지`}
            onClick={() => navigate(`/${post.user.userId}`)}
          />
          <div>
            <div className="w-fit font-default-bold text-xl cursor-pointer" onClick={() => navigate(`/${post.user.userId}`)}>{post.user.username}</div>
            <div className="w-fit text-base cursor-pointer" onClick={() => navigate(`/${post.user.userId}`)}>{post.user.bio}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-[720px] mb-8">
        <div className="flex items-center gap-2 mb-4">
          {!isLiked ? (
            <div
              className="btn-post border-yellow-500 transition-colors hover:bg-yellow-50"
              onClick={handleLike}
            >
              <img
                className="btn-like-img"
                src={getLikeAlien()}
              />
              <p className="btn-post-text text-yellow-600">{likeCount}</p>
            </div>
          ) : (
            <div
              className="btn-post border-yellow-500 bg-yellow-200 transition-colors hover:bg-yellow-300"
              onClick={handleUnlike}
            >
              <img
                className="btn-like-img"
                src={getLikeAlien()}
              />
              <p className="btn-post-text text-yellow-600">{likeCount}</p>
            </div>
          )}
          <h3
            className="btn-post border-green-600 btn-post-text text-green-800"
          >
            댓글 {pagination.totalElements || 0}
          </h3>
        </div>
        {isLoggedIn && (<CommentInput postId={post?.postId} onCommentSubmit={handleCreateComment} />)}
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