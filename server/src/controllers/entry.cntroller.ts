import Entry from "../models/entry.model.ts";
import type { Request, Response } from "express";
import { HeaderBlock } from "../models/HeaderBlock.model.ts";

export const createEntry = async (req: Request, res: Response) => {
  try {
    const entry = {
      title: "Everything changed",
      blocks: [],
      isFavorite: false,
      description:
        "It is therefore highly recommended for you to have a Linkedin account and do well to give your profile up to that with the new things you will be learning throughout this course.",
      // sentiment:"5f4dcc3b5aa765d61d8327deb882cf99",
    };
    const newEntry = await Entry.create(entry);

    const initialBlock = {
      entry: newEntry._id,
      type: "header",
      content: "Untitled",
      position: 1,
      metadata: {
        level: 2,
        spacing: "large", // could be 'small' | 'medium' | 'large'
      },
    };

    const block = await HeaderBlock.create(initialBlock);

    newEntry.blocks.push(block._id);

    await newEntry.save();

    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEntries = async (req: Request, res: Response) => {
  try {
    const entries = await Entry.find();
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEntryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const entry = await Entry.findById(id).populate("blocks");
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json(entry);
  } catch (error) {
    console.error("Error fetching entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
