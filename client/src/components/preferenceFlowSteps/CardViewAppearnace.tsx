import React from 'react';
import { UserPreferences } from '../../types/preferences.interface';
import { PreferenceToggle } from '../preferenceToggle';
import GridViewImage from '../../assets/preferenceImages/gridView.png';
import ListViewImage from '../../assets/preferenceImages/listView.png';

interface AppearancePreferenceProps {
  prefs: UserPreferences;
  onChange: (
    key: keyof UserPreferences['appearance'],
    value: boolean | string,
  ) => void;
}

export const CardViewAppearancePreference: React.FC<
  AppearancePreferenceProps
> = ({ prefs, onChange }) => {
  return (
    <div className="h-full w-full p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-violet-500">Card Layout</h3>
      <div className="space-y-6 flex mt-6">
        <div className="flex gap-2">
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
      </div>
    </div>
  );
};
