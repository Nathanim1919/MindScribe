import { createContext, useContext, useEffect, useState } from 'react';
import { Entry } from '../types/entrie.interface';
import { nanoid } from 'nanoid';


type EntryContextType = {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  selectedEntryId: string | null;
  addEntry: () => void;
  updateEntry: (id: string, update: Partial<Entry>) => void;
  deleteEntry: (id: string) => void;
  setSelectEntry: (id: string) => void;
};


const EntryContext = createContext<EntryContextType | null>(null);

export const useEntryContext = () => {
  const context = useContext(EntryContext);
  if (!context) {
    throw new Error('useEntryContext must be used within an EntryProvider');
  }
  return context;
};


export const EntryProvider = ({ children }: { children: React.ReactNode }) => {
  const [entries, setEntries] = useState<Entry[]>(() => {
    if (typeof window !== 'undefined') {
      const storedEntries = localStorage.getItem('entries');
      if (storedEntries) {
        try {
          return JSON.parse(storedEntries);
        } catch (e) {
          console.error('Failed to parse entries from localStorage:', e);
        }
      }
    }
    return [];
  });
  
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    const storedEntries = localStorage.getItem('entries');
    if (storedEntries) {
      const parsed: Entry[] = JSON.parse(storedEntries);
      setEntries(parsed);
    }
  }, []);

  useEffect(() => {
    console.log('Saving to localStorage:', entries);
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);
  

  const addEntry = () => {
    const newEntry: Entry = {
      id: nanoid(),
      title: 'Yo, new Entry',
      content: [{
        id: nanoid(),
        type: 'header',
        content: 'Untitled',
        meta:{
          level: 1,
          spacing: 'large',
        },
        prevId: null,
        nextId: null,
      }],
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
      mood: 'neutral',
    };
    setEntries((prevEntries) => [newEntry, ...prevEntries]);
    setSelectedEntryId(newEntry.id);
  };

  const updateEntry = (id: string, update: Partial<Entry>) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              ...update,
              updatedAt: Date.now().toString(),
            }
          : entry,
      ),
    );
  };

  const deleteEntry = (id: string) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
    if (selectedEntryId === id) {
      setSelectedEntryId(null);
    }
  };

  const setSelectEntry = (id: string) => {
    setSelectedEntryId(id);
  };

  return (
    <EntryContext.Provider
      value={{
        entries,
        setEntries,                                                 
        selectedEntryId,
        addEntry,
        updateEntry,
        deleteEntry,
        setSelectEntry,
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};
