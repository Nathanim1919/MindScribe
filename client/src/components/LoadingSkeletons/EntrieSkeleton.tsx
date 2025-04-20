import React from 'react';

export const EditorSkeleton: React.FC = () => {
  return (
    <div className="w-[90%] max-w-[700px] mx-auto py-6 animate-pulse space-y-6">
      {/* Header */}
      <div className="h-10 w-1/2 bg-light-300 dark:bg-dark-200 rounded-md" />

      {/* Paragraph blocks */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-[95%] bg-light-300 dark:bg-dark-100 rounded-full" />
          <div className="h-4 w-[85%] bg-light-300 dark:bg-dark-100 rounded-full" />
          <div className="h-4 w-[90%] bg-light-300 dark:bg-dark-100 rounded-full" />
        </div>
      ))}

      {/* Quote block */}
      <div className="pl-4 border-l-4 border-light-300 dark:border-dark-100">
        <div className="h-4 w-[80%] bg-light-300 dark:bg-dark-100 rounded-full" />
        <div className="h-4 w-[70%] bg-light-300 dark:bg-dark-100 rounded-full mt-1" />
      </div>

      {/* Image placeholder */}
      <div className="w-full h-56 bg-light-300 dark:bg-dark-100 rounded-xl shadow-inner" />

      {/* More paragraphs */}
      {[...Array(1)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-[92%] bg-light-300 dark:bg-dark-100 rounded-full" />
          <div className="h-4 w-[75%] bg-light-300 dark:bg-dark-100 rounded-full" />
          <div className="h-4 w-[80%] bg-light-300 dark:bg-dark-100 rounded-full" />
        </div>
      ))}
    </div>
  );
};
