import { useState } from 'react';
import { userPreferences } from '../contexts/PreferencesContext';
import { DEFAULT_PREFERENCES } from '../lib/defaultPreferences';
import { PreferenceToggle } from './preferenceToggle';

export const PreferenceSetupFlow: React.FC = () => {
  const { preferences, updatePreferences } = userPreferences();
  const [step, setStep] = useState(0);

  // Initialize with default pref if empty
  const [tempPrefs, settempPrefs] = useState(() =>
    Object.keys(preferences).length > 0 ? preferences : DEFAULT_PREFERENCES,
  );

  const handlePrefChange = <K extends keyof typeof tempPrefs>(
    category: K,
    key: keyof (typeof tempPrefs)[K],
    value: any,
  ) => {
    settempPrefs((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };


  const steps = [
    
  ]

  const handleFinish = () => {
    updatePreferences(tempPrefs); // Save to context
    // onComplete(); // Close walkthrough
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Progress bar remains same */}

      {steps[step]}

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep((prev) => Math.max(0, prev - 1))}
          disabled={step === 0}
          className="px-4 py-2 rounded disabled:opacity-50"
        >
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep((prev) => prev + 1)}
            className="px-4 py-2 bg-violet-600 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Finish Setup
          </button>
        )}
      </div>
    </div>
  );
};