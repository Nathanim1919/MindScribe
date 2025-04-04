// components/preferenceFlowSteps/AiPreference.tsx
import React from 'react';
import { UserPreferences } from '../../types/preferences.interface';
import { PreferenceToggle } from '../preferenceToggle';
import SentimentAnalaysisImage from "../../assets/preferenceImages/sentimentAnalaysis.png";
import TextAnalaysisImage from "../../assets/preferenceImages/textSummary.png";
import PromptImage from "../../assets/preferenceImages/prompt.png";

interface AiPreferenceProps {
  prefs: UserPreferences;
  onChange: (key: keyof UserPreferences['aiAssistant'], value: boolean) => void;
}

export const AiPreference: React.FC<AiPreferenceProps> = ({ prefs, onChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">AI Assistance</h3>
      <div className='grid grid-cols-3 gap-4'>
        <PreferenceToggle
          icon={TextAnalaysisImage}
          label="Enable text analysis"
          description="Get insights on your writing"
          checked={prefs.aiAssistant.enableTextAnalysis}
          onChange={(v) => onChange('enableTextAnalysis', v)}
        />
        <PreferenceToggle
          icon={SentimentAnalaysisImage}
          label="Show writing prompts"
          description='Get suggestions to inspire you'
          checked={prefs.aiAssistant.enablePromptSuggestions}
          onChange={(v) => onChange('enablePromptSuggestions', v)}
        />
        <PreferenceToggle
          icon={PromptImage}
          label="Enable sentiment analysis"
          description="Understand your emotional tone"
          checked={prefs.aiAssistant.enableSentimentAnalysis}
          onChange={(v) => onChange('enableSentimentAnalysis', v)}
        />
      </div>
    </div>
  );
};