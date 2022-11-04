import React, { useState, useEffect, useRef } from "react";
import { AllAppConfig } from "../../../core/config/all-config";

export interface ReadMoreTextProps {
  text: string;
  type?: "plainText" | "html";
  readMoreText?: string;
  readLessText?: string;
  containerHeight?: string;
  onAction?: () => void;
  lines?: number;
}

const ReadMoreText: React.FC<ReadMoreTextProps> = (props) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (el.scrollHeight > el.clientHeight) {
      setIsOverflowing(true);
    }
  }, [props.lines]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const formatText = (text: string) =>
    text.replace(/(?:\r\n|\r|\n)/g, "<br />");

  const {
    type = "plainText",
    text = "",
    readMoreText = "More",
    readLessText = "Less",
    onAction = toggleExpand,
  } = props;

  const _html = formatText(text);

  return (
    <span className="rm-container">
      <span ref={containerRef} className="rm-text-wrapper">
        {expanded
          ? _html
          : _html.substring(0, AllAppConfig.NBE_WORD_SHOW_MORE_LESS)}
      </span>
      {_html.length > AllAppConfig.NBE_WORD_SHOW_MORE_LESS ? (
        <span className="rm-action-button-container">
          {!expanded ? (
            <span className="rm-more-button" onClick={onAction}>
              {readMoreText}
            </span>
          ) : (
            <span className="rm-less-button" onClick={toggleExpand}>
              {readLessText}
            </span>
          )}
        </span>
      ) : null}
    </span>
  );
};

export default ReadMoreText;
