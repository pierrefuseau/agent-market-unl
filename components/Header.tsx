
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-red-600 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-md flex-shrink-0">
              <span className="text-red-600 font-black text-2xl tracking-tighter">unl</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Idéal by UNL</h1>
              <p className="text-xs text-red-100 hidden sm:block">
                Assistants IA pour le commerce de gros alimentaire
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
