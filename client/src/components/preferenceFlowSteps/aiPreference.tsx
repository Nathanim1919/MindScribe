import React from 'react';
import { PreferenceToggle } from '../preferenceToggle';
import { UserPreferences } from '../../types/preferences.interface';

interface AiPreferenceProps {
  tempPrefs: UserPreferences;
  handlePrefChange: <K extends keyof UserPreferences>(
    category: K,
    key: keyof UserPreferences[K],
    value: UserPreferences[K][keyof UserPreferences[K]],
  ) => void;
}

export const aiPreference: React.FC<AiPreferenceProps> = ({
  tempPrefs,
  handlePrefChange,
}) => {
  return (
    <div key="ai" className="space-y-6">
      <h3 className="text-xl font-semibold">AI Assistance</h3>
      <PreferenceToggle
        label="Enable text analysis"
        checked={tempPrefs.aiAssistant.enableTextAnalysis}
        onChange={(v) =>
          handlePrefChange('aiAssistant', 'enableTextAnalysis', v)
        }
      />
      <PreferenceToggle
        label="Show writing prompts"
        checked={tempPrefs.aiAssistant.enablePromptSuggestions}
        onChange={(v) =>
          handlePrefChange('aiAssistant', 'enablePromptSuggestions', v)
        }
      />
    </div>
  );
};
