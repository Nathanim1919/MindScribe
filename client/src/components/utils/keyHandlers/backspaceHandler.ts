import { KeyHandler } from "../../../types/key-handler.interface";
import { getCursorPosition } from "../cursorUtils";


export const handleBackspace: KeyHandler = (e, {index, currentElement, context}) => {
    const cursorPosition = getCursorPosition(currentElement);
    const currentContent = currentElement.innerText;


    if (cursorPosition === 0 || currentContent.trim() === ''){
        if (index > 0){
            e.preventDefault();
            const previousBlock = context.blocks[index - 1];
            const currentBlock = context.blocks[index];

            // merge the current block with the previous block
            context.updateBlock(index - 1, {
                content: (previousBlock.content ?? '') + (currentBlock.content ?? '')
            });
            context.deleteBlock(index);
            context.setFocusedBlockIndex(index - 1);
        }
    }
};