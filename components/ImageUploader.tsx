import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  currentImage: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, currentImage }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageSelected(result);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelected]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden bg-white
          ${isDragging ? 'border-orange-500 bg-orange-50 scale-[1.02]' : 'border-slate-300 hover:border-orange-300'}
          ${currentImage ? 'h-64' : 'h-48'}
        `}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />

        {currentImage ? (
          <img 
            src={currentImage} 
            alt="Uploaded dog" 
            className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-90 hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              <path d="m14.5 12.5-1.086-1.086a2 2 0 0 0-2.828 0L6 16" />
              <path d="M16 5h6" />
              <path d="M19 2v6" />
              <circle cx="9" cy="9" r="2" />
            </svg>
            <div>
              <p className="font-semibold text-lg">Click to upload your dog</p>
              <p className="text-sm opacity-70">or drag and drop here</p>
            </div>
          </div>
        )}
        
        {currentImage && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            Click to change
          </div>
        )}
      </div>
    </div>
  );
};