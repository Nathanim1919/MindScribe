import { Entry } from '../types/entrie.interface';
import { nanoid } from 'nanoid';

// src/storage/entryStorage.ts
const DRAFT_PREFIX = 'draft_entry_';

function getDraftKey(entryId: string): string {
  return `${DRAFT_PREFIX}${entryId}`;
}

// Save or update a draft
export function saveDraft(entry: Entry) {
  try {
    const key = getDraftKey(entry._id);
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (error) {
    console.error('Failed to save draft:', error);
  }
}

export const createNewDraft = (id: string): Entry => {
  const newEntry: Entry = {
    _id:id,
    title: '',
    blocks: [
      {
        type: 'header',
        content: 'Untitled',
        id: nanoid(),
        prevId: '',
        nextId: '',
        meta: {
          level: 1,
          spacing: 'large',
        },
      },
    ],
    mood: 'neutral',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  };

  saveDraft(newEntry);
  return newEntry;
};


export const updateDraft = (entry: Entry) => {
  const key = getDraftKey(entry._id);
  const existingDraft = loadDraft(entry._id);
  if (existingDraft) {
    entry.createdAt = existingDraft.createdAt;
  }
  entry.updatedAt = Date.now().toString();
  localStorage.setItem(key, JSON.stringify(entry));
  console.log('Draft updated:', entry);
  return entry;
}

// Load a draft
export function loadDraft(entryId: string): Entry | null {
  try {
    const raw = localStorage.getItem(getDraftKey(entryId));
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('Failed to load draft:', error);
    return null;
  }
}

// Delete a specific draft
export function deleteDraft(entryId: string) {
  try {
    localStorage.removeItem(getDraftKey(entryId));
  } catch (error) {
    console.error('Failed to delete draft:', error);
  }
}

// List all drafts (optional utility)
// export function getAllDrafts(): Entry[] {
//   try {
//     const drafts: Entry[] = [];
//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i);
//       if (key && key.startsWith(DRAFT_PREFIX)) {
//         const raw = localStorage.getItem(key);
//         if (raw) {
//           drafts.push(JSON.parse(raw));
//         }
//       }
//     }
//     return drafts;
//   } catch (error) {
//     console.error('Failed to get all drafts:', error);
//     return [];
//   }
// }

// Optional: Cleanup old drafts
// export function deleteOldDrafts(maxAgeMinutes: number = 4320) {
//   // 3 days default
//   const now = Date.now();
//   const drafts = getAllDrafts();

//   drafts.forEach((draft) => {
//     const ageMinutes = (now - Number(draft.updatedAt)) / 60000;
//     if (ageMinutes > maxAgeMinutes) {
//       deleteDraft(draft._id);
//     }
//   });
// }
