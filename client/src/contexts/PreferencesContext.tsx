import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_PREFERENCES } from '../lib/defaultPreferences';
import type { UserPreferences } from '../types/preferences.interface';

type PreferencesContextType = {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  resetToDefaults: () => void;
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined,
);

export const PreferencesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [preferences, setPreferences] =
    useState<UserPreferences>(DEFAULT_PREFERENCES);

  // Load saved preferences on mount
  useEffect(() => {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (error) {
        console.error(
          'Failed to parse user preferences from localStorage:',
          error,
        );
      }
    }
  }, []);

  // Save preferences to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }));
  };

  const resetToDefaults = () => {
    setPreferences(DEFAULT_PREFERENCES);
  };

  return (
    <PreferencesContext.Provider
      value={{ preferences, updatePreferences, resetToDefaults }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const userPreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
