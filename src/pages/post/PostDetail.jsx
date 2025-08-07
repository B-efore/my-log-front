import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { deletePost, getPost } from "../../api/postService";
import { deleteComment } from "../../api/commentService";
import Header from "../../components/header/Header";
import CommentInput from "../../components/comment/CommentInput";
import Tag from "../../components/tag/Tag";
import { formatDate } from "../../util/formatDate";
import ConfirmModal from "../../components/common/ConfirmModal";
import CommentList from "../../components/comment/CommentList";

import { showErrorToast, showSuccessToast } from "../../util/toast";
import { getLikeAlien, getProfileImage } from "../../util/get-images";
import MarkdownView from "../../components/post/MarkdownView";
import { createLike, deleteLike, getLikeCount, getLikeStatus } from "../../api/likeService";
import CategoryPostList from "./CategoryPostList";

const PostDetail = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { postId } = useParams();
  const { userId: loggedInUserId, isLoggedIn } = useAuth();

  const [post, setPost] = useState(location.state?.post || null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(!post);
  const [editingCommentId, setEditingCommentId] = useState(null);

  const [showPostConfirm, setShowPostConfirm] = useState(false);
  const [showCommentConfirm, setShowCommentConfirm] = useState({ open: false, targetId: null });

  const [likeLoading, setLikeLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const isAuthor = post?.user?.userId === loggedInUserId;

  useEffect(() => {
    getPost(postId)
      .then((res) => {
        setPost(res.data);
        setComments(res.data.comments)
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        showErrorToast("게시글을 불러오는데 실패했습니다.");
        navigate("/");
      });
  }, [postId]);

  useEffect(() => {

    const fetchLikeStatus = async () => {
      try {
        const res = await getLikeStatus(postId);
        setIsLiked(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    if (isLoggedIn) {
      fetchLikeStatus();
    }

  }, [isLoggedIn, postId]);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const res = await getLikeCount(postId);
        setLikeCount(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchLikeCount();

  }, [postId]);

  const goEdit = () =>
    navigate(`/write/${postId}`, {
      state: {
        post: post,
      }
    }
    );

  const handleDeletePost = async () => {
    setShowPostConfirm(true);
  };

  const handleConfirmDeletePost = async () => {

    setShowPostConfirm(false);
    await new Promise(resolve => setTimeout(resolve, 0));

    try {
      await deletePost(postId);
      showSuccessToast("게시글이 삭제되었습니다.");
      navigate("/");
    } catch (err) {
      showErrorToast("게사글 삭제 과정에서 오류가 발생했습니다.");
    }
  };

  const handleDeleteComment = (commentId) => {
    setShowCommentConfirm({ open: true, targetId: commentId });
  };

  const handleCreateComment = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  const handleUpdateComment = (updatedComment) => {
    setComments((prev) =>
      prev.map((c) => (c.commentId === updatedComment.commentId ? updatedComment : c))
    );
    setEditingCommentId(null);
  };

  const handleConfirmDeleteComment = async () => {

    const { targetId } = showCommentConfirm;
    setShowCommentConfirm({ open: false, targetId: null });
    await new Promise(resolve => setTimeout(resolve, 0));

    try {
      await deleteComment(postId, targetId);
      setComments((prev) =>
        prev.map((c) =>
          c.commentId === targetId ? { ...c, content: "삭제된 댓글입니다." } : c
        )
      );
      showSuccessToast("댓글이 삭제되었습니다.");
    } catch {
      showErrorToast("댓글 삭제 과정에서 오류가 발생했습니다.");
    }
  };

  const handleLikeBtn = async () => {
    if (!isLoggedIn || likeLoading) return;

    setLikeLoading(true);
    try {
      await createLike(postId);
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLikeLoading(false);
    }
  }

  const handleUnlikeBtn = async () => {
    if (!isLoggedIn || likeLoading) return;

    setLikeLoading(true);
    try {
      await deleteLike(postId);
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLikeLoading(false);
    }
  }

  if (loading || !post) {
    return <div>로딩중...</div>
  }

  return (
    <div className="flex flex-col w-full items-center box-border px-8">
      <Header />
      <div className="mt-20 flex flex-col w-full max-w-[720px] text-left">

        <CategoryPostList
          categoryName={post.category?.name || "미분류"}
          postId={postId}
        />

        <h1 className="font-orbit font-black text-4xl mb-4">
          {post.title}
        </h1>
        <hr className="border-0.5 border-gray-300 mb-4" />

        <div className="flex flex-row items-center justify-between">
          <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
          {isAuthor ? (
            <div className="flex gap-2">
              <p className="text-sm text-gray-500">당신을 응시하다... 총 {post.views}의 눈</p>
              <button className="btn-small-text" onClick={goEdit}>수정</button>
              <button className="btn-small-text" onClick={handleDeletePost}>삭제</button>
            </div>
          ) : (
            <div className="flex">
              <p className="text-sm text-gray-500">당신을 응시하다... 총 {post.views}의 눈</p>
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

        {!isLiked ? (
          <div
            className="flex flex-row items-center border-2 border-yellow-500 w-fit py-1 px-5 mt-10 mb-3 ml-auto gap-2 rounded-3xl select-none transition-colors hover:bg-yellow-50 cursor-pointer"
            onClick={handleLikeBtn}
          >
            <img
              className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10"
              src={getLikeAlien()}
            />
            <p className="text-2xl md:text-3xl text-yellow-600">{likeCount}</p>
          </div>
        ) : (
          <div
            className="flex flex-row items-center border-2 border-yellow-500 w-fit py-1 px-5 mt-10 mb-3 ml-auto gap-2 rounded-3xl select-none bg-yellow-200 transition-colors hover:bg-yellow-300 cursor-pointer"
            onClick={handleUnlikeBtn}
          >
            <img
              className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10"
              src={getLikeAlien()}
            />
            <p className="text-2xl md:text-3xl text-yellow-600">{likeCount}</p>
          </div>
        )}

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

      <div className="flex flex-col items-center w-full max-w-[720px] mb-8">
        <h3 className="self-start text-base font-default-bold mb-2">댓글 {comments.length}</h3>
        {isLoggedIn && (<CommentInput postId={postId} onCommentSubmit={handleCreateComment} />)}
        {comments.length > 0 && (
          <CommentList
            postId={postId}
            comments={comments}
            loggedInUserId={loggedInUserId}
            editingCommentId={editingCommentId}
            onEditClick={setEditingCommentId}
            onCancelEdit={() => setEditingCommentId(null)}
            onUpdate={handleUpdateComment}
            onDelete={handleDeleteComment}
          />
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