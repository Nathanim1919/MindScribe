import { BlockType } from "./block.interface";

export type DecoratorPosition = 'prefix' | 'suffix' | 'wrap';
export type DecoratorVisibility = 'always' | 'hover' | 'focus' | 'empty';



export interface BlockDecorator {
    id: string;
    position: DecoratorPosition;
    visibility: DecoratorVisibility;
    component: React.ComponentType<{block: BlockType}>;
}