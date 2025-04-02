import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { MdDragIndicator } from 'react-icons/md';
import { BlockDecorator } from '../types/decorators';

export const getQuoteDecorators = (): BlockDecorator[] => [
 
];


export const getHeaderDecorators = (level: number): BlockDecorator[] => [
  {
    id: `h${level}-icon`,
    position: 'prefix',
    visibility: 'always',
    component: () => {
      return null;
    },
  },
];



export const getParagraphDecorators = (): BlockDecorator[] => [
  {
    id: 'paragraph-icon',
    position: 'prefix',
    visibility: 'always',
    component: () => {
      return null;
    },
  },
];

// Action decorators that need handlers
// utils/decorators.ts
export const getActionDecorators = (
  onAddClick: () => void,
  onDragClick: () => void,
): BlockDecorator[] => [
  {
    id: 'add-button',
    position: 'prefix',
    visibility: 'always', // We'll handle visibility via CSS instead
    component: () => (
      <button
        onClick={(e) => {
            alert('add button clicked');
          e.preventDefault();
          e.stopPropagation();
          onAddClick();
        }}
        className="
            opacity-0 
            group-hover:opacity-100 
            transition-opacity 
            duration-200
            hover:dark:bg-dark-100 
            hover:bg-light-100 
            rounded-sm 
            cursor-pointer 
            text-[20px]
            p-1
          "
        aria-label="Add block"
      >
        <IoMdAdd />
      </button>
    ),
  },
  {
    id: 'drag-handle',
    position: 'prefix',
    visibility: 'always', // We'll handle visibility via CSS instead
    component: () => (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDragClick();
        }}
        className="
            opacity-0 
            group-hover:opacity-100 
            transition-opacity 
            duration-200
            hover:dark:bg-dark-100 
            hover:bg-light-100 
            rounded-sm 
            cursor-grab 
            text-[20px]
            p-1
          "
        aria-label="Drag block"
      >
        <MdDragIndicator />
      </button>
    ),
  },
];
