import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-8 px-4">
      <div className="flex justify-center items-center gap-3 mb-2">
        <span className="text-4xl">🌍</span>
        <span className="text-4xl">🐕</span>
      </div>
      <h1 className="text-4xl font-bold text-orange-600 mb-2 tracking-tight">
        Global Paw Prints
      </h1>
      <p className="text-slate-600 max-w-md mx-auto">
        Take your furry friend on a virtual world tour. Upload a photo and choose a destination!
      </p>
    </header>
  );
};