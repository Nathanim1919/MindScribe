import { UserPreferences } from '../../types/preferences.interface';
import { PreferenceToggle } from '../preferenceToggle';

interface NotificationPreferenceProps {
  prefs: UserPreferences;
  onChange: <K extends keyof UserPreferences>(
    category: K,
    key: keyof UserPreferences[K],
    value: UserPreferences[K][keyof UserPreferences[K]],
  ) => void;
}

export const NotificationPreference: React.FC<NotificationPreferenceProps> = ({
  prefs,
  onChange,
}) => {
  return (
    <div key="notification" className="space-y-6">
      <h3 className="text-xl font-semibold">Notifications</h3>
      <PreferenceToggle
        label="Enable daily reminders"
        checked={prefs.notifications.enableDailyReminders}
        onChange={(v) => onChange('notifications', 'enableDailyReminders', v)}
      />
      <PreferenceToggle
        label="Enable weekly digest"
        checked={prefs.notifications.enableWeeklyDigest}
        onChange={(v) => onChange('notifications', 'enableWeeklyDigest', v)}
      />
      <PreferenceToggle
        label="Enable feature updates"
        checked={prefs.notifications.enableFeatureUpdates}
        onChange={(v) => onChange('notifications', 'enableFeatureUpdates', v)}
      />
    </div>
  );
};
