import mongoose from "mongoose";


enum BlockType {
    TEXT = "text",
    HEADING_1 = "heading1",
    HEADING_2 = "heading2",
    HEADING_3 = "heading3",
    QUOTE = "quote",
}

const blockSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: Object.values(BlockType),
        required: true,
    },
    entry:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entry",
        required: true,
    },
    content: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


const Block = mongoose.model("Block", blockSchema);
export default Block;