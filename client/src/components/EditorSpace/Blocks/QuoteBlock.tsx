import React from "react";
import { IQuoteBlock } from "../../../types/block.interface";

interface QuoteBlockProps extends IQuoteBlock {}

export function QuoteBlock({ content }: QuoteBlockProps) {
  return <blockquote className="bg-red-500">{content}</blockquote>;
}