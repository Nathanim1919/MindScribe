import  { JSX } from "react";
import { IHeaderBlock } from "../../../types/block.interface";


export function HeaderBlock({level=1, content}: IHeaderBlock) {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return <Tag className="text-5xl">{content}</Tag>
}