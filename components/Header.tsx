import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          imageIN
        </h1>
      </div>
      <div className="text-sm text-slate-400 font-medium hidden sm:block">
        Powered by Gemini 2.5 Flash
      </div>
    </header>
  );
};