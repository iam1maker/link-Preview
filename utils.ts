import React from "react";
import { LinkPreviewMetadata } from "./use-link-preview-metadata";

export const urlRegex =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;


export const getCardSize = (data: LinkPreviewMetadata) => {
  // If link has cover image
  const width =
    data.images && data.images.length > 0 && data.description ? 720 : 400;

  // If link showing placeholder
  let height = 140;

  if (
    data.contentType.startsWith("text/html") ||
    data.contentType.startsWith("audio")
  ) {
    height = 140;
  } else if (
    data.contentType.startsWith("image") ||
    data.contentType.startsWith("video")
  ) {
    height = 300;
  } else {
    height = 100;
  }

  if (!data.description && data.images?.length !== 0) {
    height -= 60;
  }

  return [width, height];
};

export function debounce<T = void>(fn: (t: T) => void, delay: number) {
  let timeout: number | undefined;
  return (t: T) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      fn(t);
    }, delay);
  };
}

// Makes sure the user will not lose focus (editing state) when previewing a link
export const usePreventFocus = () => {
  React.useEffect(() => {
    let timer = 0;
    const listener = () => {
      setTimeout(() => {
        if (window.document.hasFocus()) {
          (top as any).focus();
          logseq.Editor.restoreEditingCursor();
        }
      });
    };
    timer = window.setInterval(listener, 1000);
    window.addEventListener("focus", listener);
    return () => {
      window.removeEventListener("focus", listener);
      clearInterval(timer);
    };
  }, []);
};