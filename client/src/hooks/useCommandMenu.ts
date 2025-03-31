import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { BlockType } from '../types/block.interface';

export function useCommandMenu(
  addBlock: (type: BlockType['type'], content:string, index?: number, meta?:{level: number, spacing:string}) => void,
) {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('');
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const showMenu = useCallback((index: number) => {
    const blockElement = document.querySelector(
      `[data-block-index="${index}"]`,
    ) as HTMLElement;
    if (!blockElement) return;


    const { top, left } = blockElement.getBoundingClientRect();
    setPosition({
      top: top + window.scrollY,
      left: left + window.scrollX,
    });

    setTargetIndex(index);
    setIsVisible(true);
  }, []);

  const handleSelect = useCallback(
    (type: BlockType['type'], meta?:{level: number, spacing: string}) => {
      if (targetIndex === null) return;
      addBlock(type, "",targetIndex,meta);
      hideMenu();
    },
    [addBlock, targetIndex],
  );

  const hideMenu = useCallback(() => {
    setIsVisible(false);
    setFilter('');
    setTargetIndex(null);
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
