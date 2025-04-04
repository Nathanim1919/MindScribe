import { UserPreferences } from '../../types/preferences.interface';
import { PreferenceToggle } from '../preferenceToggle';
import ReminderImage from "../../assets/preferenceImages/reminder.png";
import UpdateImage from "../../assets/preferenceImages/updates.png";
import SummaryImage from "../../assets/preferenceImages/summary.png";

interface NotificationPreferenceProps {
  prefs: UserPreferences;
  onChange: (key: keyof UserPreferences['notifications'], value: boolean) => void;
}

export const NotificationPreference: React.FC<NotificationPreferenceProps> = ({
  prefs,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-violet-500">Notifications</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Notification Cards */}
        <PreferenceToggle
          icon={ReminderImage}
          label="Daily Reminders"
          description="Get notified each day to journal"
          checked={prefs.notifications.enableDailyReminders}
          onChange={(v) => onChange('enableDailyReminders', v)}
        />
        
        <PreferenceToggle
          icon={UpdateImage}
          label="Weekly Digest"
          description="Receive weekly insights summary"
          checked={prefs.notifications.enableWeeklyDigest}
          onChange={(v) => onChange('enableWeeklyDigest', v)}
        />
        
        <PreferenceToggle
          icon={SummaryImage}
          label="Feature Updates"
          description="Learn about new features"
          checked={prefs.notifications.enableFeatureUpdates}
          onChange={(v) => onChange('enableFeatureUpdates', v)}
        />
      </div>
    </div>
  );
};