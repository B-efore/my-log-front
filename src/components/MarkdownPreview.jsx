import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownPreview = ({ title, content }) => {
  return (
    <div className="post-editor__right markdown-preview">
      <h1>{title}</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;