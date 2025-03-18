export const getCursorPosition = (element: HTMLElement): number => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return 0;

  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  return preCaretRange.toString().length;
};

export const splitContentAtCursor = (
  element: HTMLElement,
): [string, string] => {
  const cursorPosition = getCursorPosition(element);
  const content = element.innerText;
  
  console.log("Before Split - Content: ", content);
  console.log("Before Split - Cursor Position: ", cursorPosition);
  
  const beforeCursor = content.slice(0, cursorPosition);
  const afterCursor = content.slice(cursorPosition);
  
  console.log("After Split - Before Cursor: ", beforeCursor);
  console.log("After Split - After Cursor: ", afterCursor);
  
  return [beforeCursor, afterCursor];
};


export const placeCaretAtEnd = (element: HTMLElement) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
};
