import React from 'react';
import { CountryOption } from '../types';

interface ResultViewProps {
  originalImage: string;
  resultImage: string;
  country: CountryOption;
  onReset: () => void;
  onTryAnother: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ originalImage, resultImage, country, onReset, onTryAnother }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `my-dog-in-${country.name.toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in pb-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-orange-600 p-4 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>📸</span> Postcard from {country.name} {country.flag}
          </h2>
          <button 
            onClick={onReset}
            className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-1 rounded-lg transition-colors text-sm font-medium"
          >
            Start Over
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            
            {/* Original */}
            <div className="flex-1 w-full max-w-sm">
              <p className="text-center text-slate-500 mb-2 font-medium text-sm uppercase tracking-wide">Original</p>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-inner border border-slate-200 relative group">
                <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Arrow Icon */}
            <div className="flex-shrink-0 text-orange-300 md:rotate-0 rotate-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>

            {/* Result */}
            <div className="flex-1 w-full max-w-sm">
              <p className="text-center text-orange-600 mb-2 font-bold text-sm uppercase tracking-wide">Transformation</p>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-orange-100 relative group">
                <img src={resultImage} alt={`Dog in ${country.name}`} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
             <button
              onClick={onTryAnother}
              className="px-8 py-4 font-semibold text-slate-700 transition-all duration-200 bg-white border-2 border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
              </svg>
              Try Another Country
            </button>

            <button
              onClick={handleDownload}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-orange-600 rounded-full hover:bg-orange-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
            >
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </span>
              Download Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};