import { KeyHandler } from "../../../types/key-handler.interface";
import { getCursorPosition, insertTextAtCaret, placeCaretAtPosition } from "../cursorUtils";


export const handlerTab: KeyHandler = (e, { index, currentElement, currentBlock, context }) => {
    e.preventDefault();

    const currentContent = currentBlock.content; // Get content from state
    const cursorPos = getCursorPosition(currentElement); // Get cursor position from DOM

    const textToInsert = '\u00A0\u00A0\u00A0\u00A0';
    const newContent = currentContent?.slice(0, cursorPos) + textToInsert + currentContent?.slice(cursorPos);
    const newCursorPos = cursorPos + textToInsert.length;

    // Update React State FIRST
    context.updateBlock(index, { content: newContent });

    // Set cursor position AFTER state update (React render)
    requestAnimationFrame(() => {
        // Need to re-acquire the element potentially if it re-rendered
        const potentiallyNewElement = document.querySelector(`[data-block-index="${index}"]`) as HTMLElement;
        if (potentiallyNewElement) {
            placeCaretAtPosition(potentiallyNewElement, newCursorPos); // Use your utility
        }
    });
};


export const handlerSpace: KeyHandler = (e) => {
    e.preventDefault();
    insertTextAtCaret('\u00A0'); // Insert a non-breaking space (safe for all browsers)
};

export const forwardSlash: KeyHandler = (e, {index,
    context
}) => {
    e.preventDefault()
    context.showMenu(index);
}


export const shiftPlusEnter: KeyHandler = (e, { index, currentElement, context }) => {
    e.preventDefault();
    
    const cursorPos = getCursorPosition(currentElement);
    const currentText = currentElement.innerText;
    const newText = currentText.slice(0, cursorPos) + '\n' + currentText.slice(cursorPos);
    
    // Update DOM first
    // currentElement.innerText = newText;
    
    // Then update state
    context.updateBlock(index, { content: newText });

    // Set cursor position
    requestAnimationFrame(() => {
        setCursorPosition(currentElement, cursorPos + 1);
    });
};

// Add this utility if you don't have it
const setCursorPosition = (element: HTMLElement, position: number) => {
    const range = document.createRange();
    const selection = window.getSelection();
    
    if (element.childNodes[0]) {
        range.setStart(element.childNodes[0], Math.min(position, element.childNodes[0].textContent?.length || 0));
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
    }
};