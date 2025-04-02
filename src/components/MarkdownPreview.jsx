import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownPreview = ({ title, content }) => {
  return (
    <div className="post-editor__right markdown-preview">
      <h1>{title}</h1>
      <ReactMarkdown remarkPlugins={remarkGfm}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;