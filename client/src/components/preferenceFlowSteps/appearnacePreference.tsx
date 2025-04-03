import React from "react";
import { UserPreferences } from "../../types/preferences.interface";

interface AppearancePreferenceProps {
  prefs: UserPreferences;
  onChange: <K extends keyof UserPreferences>(
    category: K,
    key: keyof UserPreferences[K],
    value: UserPreferences[K][keyof UserPreferences[K]]
  ) => void;
}

export const AppearancePreference: React.FC<AppearancePreferenceProps> = ({
  prefs,
  onChange
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Appearance</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Theme</label>
          <select
            value={prefs.appearance.theme}
            onChange={(e) =>
              onChange(
                'appearance',
                'theme',
                e.target.value as UserPreferences['appearance']['theme']
              )
            }
            className="w-full p-2 border rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
        
        {/* Add other appearance preferences */}
        <div>
          <label className="block mb-2">View Mode</label>
          <div className="flex gap-2">
            {(['grid', 'list'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => 
                  onChange('appearance', 'cardView', mode)
                }
                className={`px-4 py-2 rounded ${
                  prefs.appearance.cardView === mode
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};