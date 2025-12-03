import React, { useState } from 'react';
import { Header } from './components/Header';
import { PromptPanel } from './components/PromptPanel';
import { ImageDisplay } from './components/ImageDisplay';
import { generateImageFromText } from './services/geminiService';
import { AppState, GenerationStatus } from './types';

function App() {
  const [state, setState] = useState<AppState>({
    status: GenerationStatus.IDLE,
    currentImage: null,
    error: null,
  });

  const handleGenerate = async (prompt: string) => {
    setState(prev => ({ ...prev, status: GenerationStatus.LOADING, error: null }));
    
    try {
      const imageDataUrl = await generateImageFromText(prompt);
      
      if (imageDataUrl) {
        setState({
          status: GenerationStatus.SUCCESS,
          currentImage: {
            url: imageDataUrl,
            prompt: prompt,
            timestamp: Date.now()
          },
          error: null
        });
      } else {
        throw new Error("Failed to generate valid image data.");
      }
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        status: GenerationStatus.ERROR,
        error: err.message || "An unexpected error occurred while generating the image."
      }));
    }
  };

  const handleDownload = () => {
    if (state.currentImage) {
      const link = document.createElement('a');
      link.href = state.currentImage.url;
      // Sanitize filename
      const safePrompt = state.currentImage.prompt.slice(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.download = `imageIN-${safePrompt}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 h-full">
          {/* Left Panel: Input */}
          <PromptPanel 
            onGenerate={handleGenerate} 
            status={state.status} 
            error={state.error}
          />

          {/* Right Panel: Display */}
          <div className="flex-1 w-full min-h-[500px]">
             <ImageDisplay 
                image={state.currentImage} 
                status={state.status} 
                onDownload={handleDownload}
             />
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} imageIN. Generated content may be inaccurate.</p>
      </footer>
    </div>
  );
}

export default App;