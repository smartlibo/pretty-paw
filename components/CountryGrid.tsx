import React from 'react';
import { CountryOption, COUNTRIES } from '../types';

interface CountryGridProps {
  selectedCountry: CountryOption | null;
  onSelect: (country: CountryOption) => void;
  disabled: boolean;
}

export const CountryGrid: React.FC<CountryGridProps> = ({ selectedCountry, onSelect, disabled }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
        Choose a Destination
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {COUNTRIES.map((country) => (
          <button
            key={country.id}
            onClick={() => onSelect(country)}
            disabled={disabled}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 text-center
              ${selectedCountry?.id === country.id 
                ? 'border-orange-500 bg-orange-50 shadow-md transform scale-[1.02]' 
                : 'border-slate-200 bg-white hover:border-orange-200 hover:shadow-sm'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span className="text-4xl mb-1 filter drop-shadow-sm">{country.flag}</span>
            <div>
              <h3 className="font-bold text-slate-700">{country.name}</h3>
              <p className="text-xs text-slate-500 leading-tight mt-1">{country.description}</p>
            </div>
            
            {selectedCountry?.id === country.id && (
              <div className="absolute top-2 right-2 text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};