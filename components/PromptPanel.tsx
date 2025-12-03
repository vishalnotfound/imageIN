import React, { useState } from 'react';
import { Wand2, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { GenerationStatus } from '../types';

interface PromptPanelProps {
  onGenerate: (prompt: string) => void;
  status: GenerationStatus;
  error: string | null;
}

export const PromptPanel: React.FC<PromptPanelProps> = ({ onGenerate, status, error }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (prompt.trim()) {
        onGenerate(prompt);
      }
    }
  };

  const suggestions = [
    "A cyberpunk city street at night with neon rain",
    "A cute robot gardening on Mars, digital art",
    "Portrait of a cat wearing renaissance noble clothes, oil painting",
    "A floating island with a waterfall in the sky, fantasy style"
  ];

  return (
    <div className="w-full lg:w-[400px] flex flex-col gap-6 shrink-0">
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-indigo-400" />
          Create
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe what you want to see..."
              className="w-full h-40 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all text-base leading-relaxed"
              disabled={status === GenerationStatus.LOADING}
            />
            <div className="absolute bottom-3 right-3 text-xs text-slate-500">
              {prompt.length} chars
            </div>
          </div>

          {error && (
             <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-2 text-sm text-red-200">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
             </div>
          )}

          <Button 
            type="submit" 
            isLoading={status === GenerationStatus.LOADING}
            disabled={!prompt.trim()}
            className="w-full"
            icon={<Wand2 className="w-4 h-4" />}
          >
            Generate Image
          </Button>
        </form>
      </div>

      <div className="hidden lg:block">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">
          Try these examples
        </h3>
        <div className="flex flex-col gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setPrompt(suggestion)}
              disabled={status === GenerationStatus.LOADING}
              className="text-left p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800 border border-transparent hover:border-slate-700 text-slate-300 text-sm transition-all duration-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};