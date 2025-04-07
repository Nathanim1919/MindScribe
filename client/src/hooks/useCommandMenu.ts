import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { BlockType } from '../types/block.interface';

export function useCommandMenu(
  addBlock: (type: BlockType['type'], content:string, afterId?:string, beforeId?: string, index?: number, meta?:{level: number, spacing:string}) => void,
) {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('');
  const [targetBlockId, setTragetBlockId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const showMenu = useCallback((id: string | null) => {
    const blockElement = document.querySelector(
      `[data-block-id="${id}"]`,
    ) as HTMLElement;
    if (!blockElement) return;


    const { top, left } = blockElement.getBoundingClientRect();
    setPosition({
      top: top + window.scrollY,
      left: left + window.scrollX,
    });

    setTragetBlockId(id);
    setIsVisible(true);
  }, []);

  const handleSelect = useCallback(
    (type: BlockType['type'], meta?:{level: number, spacing: string}) => {
      if (targetBlockId === null) return;
      addBlock(type, "",targetBlockId, meta);
      hideMenu();
    },
    [addBlock, targetBlockId],
  );

  const hideMenu = useCallback(() => {
    setIsVisible(false);
    setFilter('');
    setTragetBlockId(null);
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
