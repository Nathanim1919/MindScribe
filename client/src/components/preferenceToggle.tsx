// Reusable Toggle Component
export const PreferenceToggle = ({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => {
    return (
      <label className="flex items-center justify-between cursor-pointer">
        <span>{label}</span>
        <div className="relative">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`block w-12 h-6 rounded-full ${
              checked ? 'bg-violet-600' : 'bg-gray-300'
            }`}
          />
          <div
            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
              checked ? 'transform translate-x-6' : ''
            }`}
          />
        </div>
      </label>
    );
  };
  