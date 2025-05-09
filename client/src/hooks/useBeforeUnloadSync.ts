// hooks/useBeforeUnloadSync.ts
import { useEffect } from 'react';
import { Entry } from '../types/entrie.interface';
import { updateEntry } from '../services/entry.service';

export function useBeforeUnloadSync(entry: Entry | undefined) {
  
  useEffect(() => {
    if (!entry || !entry._id || !entry.blocks || !Array.isArray(entry.blocks)) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!entry) return;
      updateEntry(entry._id, entry);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [entry]);
}
