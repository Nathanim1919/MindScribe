import { Router } from "express";
import { createEntry, getEntries } from "../controllers/entry.cntroller.ts";

const router = Router();

router.post("/", createEntry);
router.get("/", getEntries);


export default router;