import React from 'react';

export const PrivateLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="text-ava">{children}</div>;
};
