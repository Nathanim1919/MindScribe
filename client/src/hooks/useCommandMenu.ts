import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { BlockType } from '../types/block.interface';
import { placeCaretAtStart } from '../components/utils/cursorUtils';
import { BlockMeta } from '../types/meta.type';

export function useCommandMenu(
  addBlock: (payload: {
    type: BlockType['type'];
    content: string;
    afterId?: string;
    beforeId?: string;
    meta?: BlockMeta;
  }) => string,
  refMap: Map<string, React.RefObject<HTMLElement>>,
) {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('');
  const [targetBlockId, setTargetBlockId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const showMenu = useCallback((id: string) => {
    alert('Command Menu Opened, with id: ' + id);
    const blockElement = refMap.get(id)?.current;
    if (!blockElement) return;

    const { top, left } = blockElement.getBoundingClientRect();
    setPosition({
      top: top + window.scrollY,
      left: left + window.scrollX,
    });

    setTargetBlockId(id);
    setIsVisible(true);
  }, []);

  const handleSelect = useCallback(
    async (type: BlockType['type'], meta?: BlockMeta) => {
      if (targetBlockId === null) return;

      if (type === 'image') {
        console.log('🧪 Image Payload', {
          type,
          content: '',
          afterId: targetBlockId,
          meta: {
            width: 600,
            alignment: 'center',
          },
          imageUrl:
            'https://images.supersport.com/media/3t2hfy10/soc_080425_uefa_arsvrma_hd5.png?width=1000',
          caption: 'Test image',
        });
      }

      const newBlock = addBlock({
        type,
        content:'',
        afterId: targetBlockId,
        meta,
      });
      if (!newBlock) return;
      setTargetBlockId(newBlock);
      await new Promise((resolve) => setTimeout(resolve, 0));
      const targetEl = refMap.get(newBlock)?.current;

      if (targetEl) {
        requestAnimationFrame(() => {
          placeCaretAtStart(targetEl);
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      }
      hideMenu();
    },
    [addBlock, targetBlockId],
  );

  const hideMenu = useCallback(() => {
    setIsVisible(false);
    setFilter('');
    setTargetBlockId(null);
  }, []);

  useLayoutEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        hideMenu();
      }
    };

    if (isVisible) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [hideMenu, isVisible]);

  return {
    isVisible,
    filter,
    setFilter,
    position,
    menuRef,
    showMenu,
    handleSelect,
    hideMenu,
  };
}
