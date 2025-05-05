import { createContext, useContext, useState } from 'react';
import { Entry } from '../types/entrie.interface';

interface EntryContextType {
  entries: Entry[];
  selectedEntryDetail: Entry | null;
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  setSelectedEntryDetail: React.Dispatch<React.SetStateAction<Entry | null>>;
}

const EntryContext = createContext<EntryContextType | null>(null);

export const useEntryContext = () => {
  const context = useContext(EntryContext);
  if (!context) {
    throw new Error('useEntryContext must be used within an EntryProvider');
  }
  return context;
};

export const EntryProvider = ({ children }: { children: React.ReactNode }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntryDetail, setSelectedEntryDetail] = useState<Entry | null>(
    null,
  );

  // Setting entries and selectedEntryId will be handled from the context
  return (
    <EntryContext.Provider
      value={{
        entries,
        setEntries,
        selectedEntryDetail,
        setSelectedEntryDetail,
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};
