export interface UserPreferences {
  aiAssistant: {
    analyzeText: boolean;
    suggestPrompts: boolean;
    sentimentAnalysis: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    cardDispay: 'grid' | 'list';
  };
  notifications: {
    dailyReminders: boolean;
    weeklySummary: boolean;
    newFeatures: boolean;
  };
}
