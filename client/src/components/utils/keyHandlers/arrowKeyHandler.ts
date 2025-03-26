import { KeyHandler } from "../../../types/key-handler.interface";


export const handleArrowKeys: KeyHandler = (e, {index, context}) => {
    e.preventDefault();
    if (e.key === 'ArrowDown' && index < context.blocks.length - 1) {
        context.setFocusedBlockIndex(index + 1);
    } else if (e.key === 'ArrowUp' && index > 0) {
        context.setFocusedBlockIndex(index - 1);
    }
}