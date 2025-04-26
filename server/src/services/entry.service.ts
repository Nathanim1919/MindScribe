import { BlockModel } from "../models/block.model";
import mongoose from "mongoose";
import { Block } from "../types/block.type";


export const createNewEntry = async (blockData:Block): Promise<Block> => {
    try {
        const newBlock = new BlockModel(blockData);
        return await newBlock.save();
    } catch (error) {
        console.error("Error creating new entry:", error);
        throw new Error("Failed to create new entry");
    }
}


export const updateEntry = async (updateData):Promise<void> => {

}


export const deleteBlock = async (blockId: string):Promise<void> => {

}


