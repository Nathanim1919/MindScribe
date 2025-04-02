export interface UserPreferences {
  aiAssistant: {
    enableTextAnalysis: boolean;
    enablePromptSuggestions: boolean;
    enableSentimentAnalysis: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    cardView: 'grid' | 'list';
  };
  notifications: {
    enableDailyReminders: boolean;
    enableWeeklyDigest: boolean;
    enableFeatureUpdates: boolean;
  };
}
