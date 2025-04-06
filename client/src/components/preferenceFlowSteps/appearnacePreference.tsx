import React from 'react';
import { UserPreferences } from '../../types/preferences.interface';
import { PreferenceToggle } from '../preferenceToggle';
import DarkModeImage from "../../assets/preferenceImages/darkMode.png";
import LightModeImage from "../../assets/preferenceImages/lightMode.png";

interface AppearancePreferenceProps {
  prefs: UserPreferences;
  onChange: (
    key: keyof UserPreferences['appearance'],
    value: boolean | string,
  ) => void;
}

export const AppearancePreference: React.FC<AppearancePreferenceProps> = ({
  prefs,
  onChange,
}) => {
  return (
    <div className="h-full w-full p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-violet-500">Theme Preferences</h3>
      <div className="space-y-6 flex mt-6">
          {/* Theme Selection Cards */}
          <div className="space-y-2 w-full h-full">
            <div className="grid grid-cols-2 gap-2">
              <PreferenceToggle
                image={LightModeImage}
                label="Light"
                checked={prefs.appearance.theme === 'light'}
                onChange={() => onChange('theme', 'light')}
              />
              <PreferenceToggle
                image={DarkModeImage}
                label="Dark"
                checked={prefs.appearance.theme === 'dark'}
                onChange={() => onChange('theme', 'dark')}
              />
            </div>
          </div>
        </div>
    </div>
  );
};
