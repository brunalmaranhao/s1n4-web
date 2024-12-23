import React from "react";
import DOMPurify from "dompurify";

interface RichTextViewerProps {
  content: string;
}

const RichTextViewer: React.FC<RichTextViewerProps> = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div
      className="rich-text-viewer"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default RichTextViewer;
