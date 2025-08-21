import { getLikeAlien } from "../../util/get-images";

const LikeBtn = ({ isLiked, likeCount, onLike, onUnlike }) => {
  
    const buttonClass = `btn-post border-yellow-500 transition-colors ${
    isLiked 
      ? 'bg-yellow-200 hover:bg-yellow-300' 
      : 'hover:bg-yellow-50'
  }`;

  return (
    <div
      className={buttonClass}
      onClick={isLiked ? onUnlike : onLike}
    >
      <img className="btn-like-img" src={getLikeAlien()} />
      <p className="btn-post-text text-yellow-600">{likeCount}</p>
    </div>
  );
};

export default LikeBtn;