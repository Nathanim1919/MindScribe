import { useState } from "react";
import { AiPreference } from "./preferenceFlowSteps/aiPreference";
import { AppearancePreference } from "./preferenceFlowSteps/appearnacePreference";
import { NotificationPreference } from "./preferenceFlowSteps/notificationPreference";
import { userPreferences } from "../contexts/PreferencesContext";
import { DEFAULT_PREFERENCES } from "../lib/defaultPreferences";

export const PreferenceSetupFlow: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const { preferences, updatePreferences } = userPreferences();
  const [step, setStep] = useState(0);
  const [tempPrefs, setTempPrefs] = useState(() => 
    Object.keys(preferences).length > 0 ? preferences : DEFAULT_PREFERENCES
  );

  // Type-safe step handler
  const steps = [
    {
      title: "AI Preferences",
      component: (
        <AiPreference 
          prefs={tempPrefs}
          onChange={(key, value) => 
            setTempPrefs(prev => ({
              ...prev,
              ai: { ...prev.aiAssistant, [key]: value }
            }))
          }
        />
      )
    },
    {
      title: "Appearance",
      component: (
        <AppearancePreference
          prefs={tempPrefs}
          onChange={(key, value) => 
            setTempPrefs(prev => ({
              ...prev,
              appearance: { ...prev.appearance, [key]: value }
            }))
          }
        />
      )
    },
    {
      title: "Notifications",
      component: (
        <NotificationPreference
          prefs={tempPrefs}
          onChange={(key, value) => 
            setTempPrefs(prev => ({
              ...prev,
              notifications: { ...prev.notifications, [key]: value }
            }))
          }
        />
      )
    }
  ];

  const handleFinish = () => {
    updatePreferences(tempPrefs);
    onComplete?.();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Progress indicator */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{steps[step].title}</h2>
        <div className="flex gap-2 mb-4">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`h-1 flex-1 rounded-full ${
                index <= step ? 'bg-violet-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Current step content */}
      <div className="min-h-[300px]">
        {steps[step].component}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(prev => Math.max(0, prev - 1))}
          disabled={step === 0}
          className="px-4 py-2 rounded disabled:opacity-50"
        >
          Back
        </button>
        
        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep(prev => prev + 1)}
            className="px-4 py-2 bg-violet-600 text-white rounded"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Complete Setup
          </button>
        )}
      </div>
    </div>
  );
};