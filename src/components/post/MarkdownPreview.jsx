import MarkdownView from "./MarkdownView";

const MarkdownPreview = ({ title, content }) => {
  return (
    <div className="hidden lg:flex flex-col flex-1 min-h-0 px-8 py-4 gap-4 overflow-auto text-left bg-green-50">
      <h1 className="font-default-bold text-5xl my-2">{title}</h1>
      <MarkdownView
        content={content}
      />
    </div>
  );
};

export default MarkdownPreview;