import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { CountryGrid } from './components/CountryGrid';
import { ResultView } from './components/ResultView';
import { CountryOption, GenerationState } from './types';
import { generateDogCostume } from './services/geminiService';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
  const [generationState, setGenerationState] = useState<GenerationState>({
    isLoading: false,
    error: null,
    resultImage: null,
  });

  const handleGenerate = async () => {
    if (!originalImage || !selectedCountry) return;

    setGenerationState({ isLoading: true, error: null, resultImage: null });

    try {
      const result = await generateDogCostume(originalImage, selectedCountry.promptAdjective);
      setGenerationState({
        isLoading: false,
        error: null,
        resultImage: result,
      });
    } catch (err: any) {
      setGenerationState({
        isLoading: false,
        error: err.message || "Failed to generate image. Please try again.",
        resultImage: null,
      });
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setSelectedCountry(null);
    setGenerationState({ isLoading: false, error: null, resultImage: null });
  };

  const handleTryAnother = () => {
    // Keep originalImage, but reset country and result to go back to selection
    setSelectedCountry(null);
    setGenerationState({ isLoading: false, error: null, resultImage: null });
  };

  return (
    <div className="min-h-screen pb-12 px-4">
      <Header />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto">
        
        {/* Error Display */}
        {generationState.error && (
          <div className="max-w-md mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span className="text-sm font-medium">{generationState.error}</span>
            <button onClick={() => setGenerationState(prev => ({...prev, error: null}))} className="ml-auto text-red-400 hover:text-red-700">✕</button>
          </div>
        )}

        {/* View Switcher: Setup vs Result */}
        {!generationState.resultImage ? (
          <div className={`transition-all duration-500 ${generationState.isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Upload Your Dog
              </h2>
              <ImageUploader 
                onImageSelected={setOriginalImage} 
                currentImage={originalImage} 
              />
            </div>

            {originalImage && (
              <div className="animate-fade-in-up">
                <CountryGrid 
                  selectedCountry={selectedCountry}
                  onSelect={setSelectedCountry}
                  disabled={generationState.isLoading}
                />
              </div>
            )}

            {originalImage && selectedCountry && (
              <div className="flex justify-center mt-8 animate-bounce-in">
                <button
                  onClick={handleGenerate}
                  disabled={generationState.isLoading}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold py-4 px-12 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3"
                >
                  {generationState.isLoading ? (
                    <>
                      <span className="loader border-t-white border-slate-500 w-5 h-5"></span>
                      Traveling to {selectedCountry.name}...
                    </>
                  ) : (
                    <>
                      <span>✈️</span> Generate Photo
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          <ResultView 
            originalImage={originalImage!}
            resultImage={generationState.resultImage!}
            country={selectedCountry!}
            onReset={handleReset}
            onTryAnother={handleTryAnother}
          />
        )}
      </main>
      
      {/* Loading Overlay for better UX */}
      {generationState.isLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="loader w-16 h-16 border-4 border-slate-200 border-t-orange-500 mb-6"></div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Designing Costume...</h3>
          <p className="text-slate-500">The AI is tailoring a {selectedCountry?.promptAdjective} for your pup.</p>
        </div>
      )}
    </div>
  );
};

export default App;