import React from 'react';
import { PreferenceToggle } from '../preferenceToggle';
import { UserPreferences } from '../../types/preferences.interface';

interface AiPreferenceProps {
    prefs: UserPreferences;
  onChange: <K extends keyof UserPreferences>(
    category: K,
    key: keyof UserPreferences[K],
    value: UserPreferences[K][keyof UserPreferences[K]],
  ) => void;
}

export const AiPreference: React.FC<AiPreferenceProps> = ({
    prefs,
  onChange,
}) => {
  return (
    <div key="ai" className="space-y-6">
      <h3 className="text-xl font-semibold">AI Assistance</h3>
      <PreferenceToggle
        label="Enable text analysis"
        checked={prefs.aiAssistant.enableTextAnalysis}
        onChange={(v) =>
          onChange('aiAssistant', 'enableTextAnalysis', v)
        }
      />
      <PreferenceToggle
        label="Show writing prompts"
        checked={prefs.aiAssistant.enablePromptSuggestions}
        onChange={(v) =>
          onChange('aiAssistant', 'enablePromptSuggestions', v)
        }
      />
    </div>
  );
};
