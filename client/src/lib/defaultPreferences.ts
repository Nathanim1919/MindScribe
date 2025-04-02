import { UserPreferences } from '../types/preferences.interface';

export const DEFAULT_PREFERENCES: UserPreferences = {
  aiAssistant: {
    enableTextAnalysis: false,
    enablePromptSuggestions: false,
    enableSentimentAnalysis: true,
  },
  appearance: {
    theme: 'dark',
    cardView: 'grid',
  },
  notifications: {
    enableDailyReminders: true,
    enableWeeklyDigest: true,
    enableFeatureUpdates: true,
  },
};
