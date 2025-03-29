import { KeyHandler } from "../../../types/key-handler.interface";
import { insertTextAtCaret } from "../cursorUtils";

export const handlerTab: KeyHandler = (e) => {
    e.preventDefault();
    insertTextAtCaret('\u00A0\u00A0\u00A0\u00A0'); // Insert a non-breaking space (safe for all browsers
};


export const handlerSpace: KeyHandler = (e) => {
    e.preventDefault();
    insertTextAtCaret('\u00A0'); // Insert a non-breaking space (safe for all browsers)
};

export const forwardSlash = (e) => {
    
}