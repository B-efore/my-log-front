import { formatDate } from "../../util/formatDate";

const PostHeader = ({
    title,
    createdAt,
    views,
    isAuthor,
    onEdit,
    onDelete
}) => {
    return (
        <>
            <h1 className="font-orbit font-black text-4xl mb-4">
                {title}
            </h1>
            <hr className="border-0.5 border-gray-300 mb-4" />

            <div className="flex flex-row items-center justify-between">
                <span className="text-sm text-gray-500">{formatDate(createdAt)}</span>
                {isAuthor ? (
                    <div className="flex gap-2">
                        <p className="text-sm text-gray-500">응시하다... 총 {views}의 눈</p>
                        <button className="btn-small-text" onClick={onEdit}>수정</button>
                        <button className="btn-small-text" onClick={onDelete}>삭제</button>
                    </div>
                ) : (
                    <div className="flex">
                        <p className="text-sm text-gray-500">응시하다... 총 {views}의 눈</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default PostHeader;