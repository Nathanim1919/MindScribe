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

  const beforeCursor = content.slice(0, cursorPosition);
  const afterCursor = content.slice(cursorPosition);

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

export const placeCaretAtStart = (element: HTMLElement) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(true);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

export const placeCaretAtPosition = (
  element: HTMLElement,
  position: number,
) => {
  const range = document.createRange();
  const selection = window.getSelection();

  if (!selection) return;

  // Ensure position is within bounds
  const textNode = element.firstChild;
  const validPosition = textNode
    ? Math.min(position, textNode.textContent?.length || 0)
    : 0;

  if (textNode) {
    range.setStart(textNode, validPosition);
    range.setEnd(textNode, validPosition);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};


export const insertTextAtCaret = (text: string) => {
  console.log('Inserting text at caret:', text); // Debugging
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  range.deleteContents(); // Remove any selected content
  
  const textNode = document.createTextNode(text);
  range.insertNode(textNode); // Insert space

  // Move caret after inserted text
  range.setStartAfter(textNode);
  range.setEndAfter(textNode);
  selection.removeAllRanges();
  selection.addRange(range);
  // placeCart at the end of the textNode
  placeCaretAtEnd(textNode.parentElement as HTMLElement);
};