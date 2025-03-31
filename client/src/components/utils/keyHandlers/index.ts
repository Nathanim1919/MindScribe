import { KeyHandler } from '../../../types/key-handler.interface';
import { handleArrowKeys } from './arrowKeyHandler';
import { handleBackspace } from './backspaceHandler';
import { handleEnter } from './enterHandler';
import { handlerTab, handlerSpace, forwardSlash } from './tabHandler';
// import { handleSlash } from './slashHandler';
// import { handleTab } from './tabHandler';
// import { handleSpace } from './spaceHandler';

const KEY_HANDLERS: Record<string, KeyHandler> = {
  Backspace: handleBackspace,
  Enter: handleEnter,
  ArrowUp: handleArrowKeys,
  ArrowDown: handleArrowKeys,
  // '/': handleSlash,
  Tab: handlerTab,
  ' ': handlerSpace,
  '/': forwardSlash
};

export const getKeyHandler = (key: string): KeyHandler | undefined => {
  return KEY_HANDLERS[key];
};

