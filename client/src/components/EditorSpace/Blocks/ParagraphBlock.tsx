import { IParagraphBlock } from "../../../types/block.interface";


export function ParagraphBlock({ content }: IParagraphBlock) {
  return <p className="text-orange-400">{content}</p>;
}