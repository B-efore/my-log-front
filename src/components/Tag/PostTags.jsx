import Tag from "./Tag";

const PostTags = ({ tags }) => {
  if (!tags?.length) return null;

  return (
    <div className="flex flex-wrap items-center justify-start gap-2 my-2">
      {tags.map((tag) => (
        <Tag key={tag.tagId} label={tag.name} />
      ))}
    </div>
  );
};

export default PostTags;