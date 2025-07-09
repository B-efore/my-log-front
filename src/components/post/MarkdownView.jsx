import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const MarkdownView = ({ content }) => {
    return (
        <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-2" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold my-2" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-semibold my-2" {...props} />,
                p: ({ node, ...props }) => <p className="my-2 text-base" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-2" {...props} />,
                li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2" {...props} />,
                code: ({ node, inline, className, children, ...props }) => {

                    if (!children) return null;

                    return inline ? (
                        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                            {children}
                        </code>
                    ) : (
                        <pre className="round-box-border bg-white text-black p-4 overflow-auto my-2">
                            <code className="text-sm font-mono" {...props}>
                                {children}
                            </code>
                        </pre>
                    );
                },
            }}
        >
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownView;