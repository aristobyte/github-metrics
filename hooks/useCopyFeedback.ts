"use client";

import * as React from "react";

export type CopyState = Record<string, boolean>;

async function copyText(value: string) {
  if (!value) return;
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export function useCopyFeedback() {
  const [state, setState] = React.useState<CopyState>({});

  const handleCopy = React.useCallback(async (key: string, value: string) => {
    await copyText(value);
    setState((prev) => ({ ...prev, [key]: true }));
    window.setTimeout(() => {
      setState((prev) => ({ ...prev, [key]: false }));
    }, 900);
  }, []);

  return { state, handleCopy };
}
