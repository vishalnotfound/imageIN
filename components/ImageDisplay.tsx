import React from 'react';
import { Download, Image as ImageIcon, Maximize2 } from 'lucide-react';
import { GeneratedImage, GenerationStatus } from '../types';
import { Button } from './Button';

interface ImageDisplayProps {
  image: GeneratedImage | null;
  status: GenerationStatus;
  onDownload: () => void;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, status, onDownload }) => {
  return (
    <div className="flex-1 flex flex-col h-full min-h-[400px] lg:min-h-[600px] bg-slate-800/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm overflow-hidden relative group">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900/0 to-slate-900/0 pointer-events-none" />

      {status === GenerationStatus.LOADING ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-pulse gap-4">
          <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center">
            <SparklesIcon className="w-12 h-12 text-indigo-400 animate-spin-slow" />
          </div>
          <h3 className="text-xl font-medium text-indigo-300">Dreaming up your image...</h3>
          <p className="text-slate-400 max-w-xs">AI is processing your prompt. This might take a few seconds.</p>
        </div>
      ) : image ? (
        <div className="relative flex-1 flex items-center justify-center w-full h-full">
          <img 
            src={image.url} 
            alt={image.prompt} 
            className="max-w-full max-h-[60vh] lg:max-h-[70vh] rounded-lg shadow-2xl object-contain z-10 transition-transform duration-500 ease-out transform hover:scale-[1.01]"
          />
          
          {/* Overlay controls */}
          <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <Button variant="secondary" onClick={() => window.open(image.url, '_blank')} className="!p-2">
                <Maximize2 className="w-5 h-5" />
             </Button>
          </div>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
            <Button 
                onClick={onDownload} 
                variant="primary" 
                icon={<Download className="w-5 h-5" />}
                className="shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Download Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-4">
          <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 dashed border-2">
            <ImageIcon className="w-10 h-10 opacity-50" />
          </div>
          <p className="font-medium text-lg">Your canvas is empty</p>
          <p className="text-sm text-slate-600 text-center max-w-sm">
            Enter a detailed prompt on the left to start generating amazing visuals with Gemini.
          </p>
        </div>
      )}
    </div>
  );
};

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M9 3v4" />
    <path d="M3 5h4" />
    <path d="M3 9h4" />
  </svg>
);
