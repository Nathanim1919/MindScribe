// hooks/useInactivitySync.ts
import { useEffect } from 'react';
import { debounce } from 'lodash';
import { Entry } from '../types/entrie.interface';
import { updateDraft } from '../storage/entryStorage'; // optional local update
import { updateEntry } from '../services/entry.service';

export function useInactivitySync(entry: Entry | undefined, delay = 15000) {
  
  useEffect(() => {
    if (!entry || !entry._id || !entry.blocks || !Array.isArray(entry.blocks)) return;
    const debouncedSync = debounce(() => {
      console.log('User inactive. Syncing to DB...');
      updateDraft(entry); // Update local just in case
      updateEntry(entry._id, entry); // Push to backend
    }, delay);

    debouncedSync(); // start debounce when entry changes

    return () => {
      debouncedSync.cancel();
    };
  }, [entry, delay]);
}
