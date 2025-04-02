import { IoMdAdd } from 'react-icons/io';
import { MdDragIndicator } from 'react-icons/md';
import { BlockDecorator } from '../types/decorators';

interface ActionDecoratorProps {
  index: number;
  setFocusedBlockIndex: (index: number) => void;
  showMenu: (index: number) => void;
  hideMenu: () => void;
  setIsCommandOptionVisible: (visible: boolean) => void;
}

export const getActionDecorators = (
  props: ActionDecoratorProps,
): BlockDecorator[] => [
  {
    id: 'add-button',
    position: 'prefix',
    visibility: 'hover',
    component: () => (
      <IoMdAdd
        onClick={(e) => {
          e.stopPropagation();
          props.setFocusedBlockIndex(props.index);
          props.showMenu(props.index);
          props.setIsCommandOptionVisible(false);
        }}
        className="hover:dark:bg-dark-100 hover:bg-light-100 rounded-sm opacity-0 group-hover:opacity-100 cursor-pointer text-[20px]"
      />
    ),
  },
  {
    id: 'drag-handle',
    position: 'prefix',
    visibility: 'hover',
    component: () => (
      <MdDragIndicator
        onMouseDown={(e) => {
          e.stopPropagation();
          props.setFocusedBlockIndex(props.index);
          props.setIsCommandOptionVisible(true);
          props.hideMenu();
        }}
        className="hover:dark:bg-dark-100 hover:bg-light-100 rounded-sm opacity-0 group-hover:opacity-100 cursor-grab text-[20px]"
      />
    ),
  },
];
