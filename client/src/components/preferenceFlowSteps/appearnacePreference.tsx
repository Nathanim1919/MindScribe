import React from 'react';
import { UserPreferences } from '../../types/preferences.interface';
import { PreferenceToggle } from '../preferenceToggle';
import DarkModeImage from "../../assets/preferenceImages/darkMode.png";
import LightModeImage from "../../assets/preferenceImages/lightMode.png";
import GridViewImage from "../../assets/preferenceImages/gridView.png";
import ListViewImage from "../../assets/preferenceImages/listView.png";

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
    <div className="bg-sky-500/20 h-full w-full p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">Appearance</h3>
      <div className="space-y-6 flex mt-6">
          {/* Theme Selection Cards */}
          <div className="space-y-2 w-full h-full">
            <label className="block mb-2">Theme</label>
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
        {/* <div className="space-y-2 w-full flex-1">
          <label className="block mb-2">View Mode</label>
          <div className="flex flex-col gap-2">
            <PreferenceToggle
              image={GridViewImage}
              label="Grid View"
              checked={prefs.appearance.cardView === 'grid'}
              onChange={() => onChange('cardView', 'grid')}
            />
            <PreferenceToggle
              image={ListViewImage}
              label="List View"
              checked={prefs.appearance.cardView === 'list'}
              onChange={() => onChange('cardView', 'list')}
            />
          </div>
        </div> */}
    </div>
  );
};
