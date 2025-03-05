import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="text-ava">
      <Header />
      <main>
        {children}</main>
      <Footer />
    </div>
  );
};
