import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { BlockType } from '../types/block.interface';
import { placeCaretAtStart } from '../components/utils/cursorUtils';
import { BlockMeta } from '../types/meta.type';

export function useCommandMenu(
  addBlock: (payload: {
    type: BlockType['type'];
    content: string;
    urls?: {
      url: string;
      caption: string;
      alt: string;
      meta?: {
        width: number;
        height: number;
        alignment?: 'left' | 'center' | 'right';
      };
    }[];
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
  
      // We only need to add one block, based on the type
      let newBlock = null;
  
      // Check if the selected block type is 'image'
      if (type === 'image') {
        console.log("WE ARE GOING TO ADD AN IMAGE BLOCK WITH BLOC DATA OF", type);
        // Add the image block
        newBlock = addBlock({
          type,
          content: '', // Not needed for image, since we're using `urls`
          afterId: targetBlockId,
          meta,
          urls: [
            {
              url: 'https://images.supersport.com/media/3t2hfy10/soc_080425_uefa_arsvrma_hd5.png?width=1000',
              caption: 'Test image',
              alt: 'Image description',
              meta: {
                width: 600, // Can be dynamic based on meta
                height: 400, // Can be dynamic based on meta
                alignment: 'center',
              },
            },
          ],
        });
      } else {
        // Add any other block (e.g., paragraph, header, quote)
        newBlock = addBlock({
          type,
          content: '', // Assuming no content needed for other block types
          afterId: targetBlockId,
          meta,
        });
      }
  
      // If no new block was created, exit
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
  
      // Hide the menu after selection
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
