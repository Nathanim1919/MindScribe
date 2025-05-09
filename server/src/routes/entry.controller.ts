import { Router } from "express";
import { createEntry, getEntries, getEntryById } from "../controllers/entry.cntroller.ts";

const router = Router();

router.post("/", createEntry);
router.get("/", getEntries);
router.get("/:id", getEntryById);


export default router;