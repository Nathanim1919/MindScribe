// hooks/useAutoSaveDraft.ts
import { useEffect } from 'react';
import { debounce } from 'lodash';
import { Entry } from '../types/entrie.interface';
import { updateDraft } from '../storage/entryStorage';

/**
 * Custom hook to auto-save a draft entry after a specified delay.
 * This is useful for preventing data loss during editing.
 * @param entry The entry object to be auto-saved
 * @param delay The delay in milliseconds before auto-saving the draft
 * @returns void
 */

export function useAutoSaveDraft(entry: Entry | undefined, delay = 1000) {
  useEffect(() => {
    console.log('📦 entryData.blocks changed', entry?.blocks);
  }, [JSON.stringify(entry?.blocks)]);
  
  
  useEffect(() => {
    if (!entry || !entry._id || !entry.blocks || !Array.isArray(entry.blocks))
      return;
    
    const saveDraft = debounce(() => {
      updateDraft(entry);
      console.log('AutoSaveDraft Hook:', entry);
      console.log('Full entry auto-saved');
    }, delay);

    saveDraft();

    return () => {
      saveDraft.cancel();
    };
  }, [entry, delay, [JSON.stringify(entry?.blocks)]]);
}
