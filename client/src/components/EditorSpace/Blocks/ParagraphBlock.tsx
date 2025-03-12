import { IParagraphBlock } from "../../../types/block.interface";

interface ParagraphBlockProps extends IParagraphBlock {}

export function ParagraphBlock({ content }: ParagraphBlockProps) {
  return <p className="text-orange-400">{content}</p>;
}