import { KeyHandlerContext } from '../../types/key-handler.interface';
import { getKeyHandler } from './keyHandlers';
import { shiftPlusEnter } from './keyHandlers/tabHandler';

export const handleKeyPress = (
  e: React.KeyboardEvent<HTMLDivElement>,
  id: string,
  context: KeyHandlerContext,
) => {
  const handler = getKeyHandler(e.key);
  if (!handler) return;

  // Handle Shift+Enter first
  if (e.key === 'Enter' && e.shiftKey) {
    shiftPlusEnter(e, { id, currentElement: e.currentTarget, context });
    return;
  }

  handler(e, {
    id,
    currentElement: e.currentTarget,
    context,
  });
};
