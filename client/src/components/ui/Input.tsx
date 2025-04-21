import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-violet-500">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`bg-light-50/30 dark:bg-dark-50/30 dark:text-light-50 border ${
          error ? 'border-red-500' : 'dark:border-dark-100 border-light-200'
        } outline-none rounded-md p-2 focus:border-violet-600/70 transition-all duration-300`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};
