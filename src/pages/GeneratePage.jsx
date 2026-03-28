import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Wand2, Download, Maximize2, Image as ImageIcon, Dice5,
  AlertCircle, Copy, Check, Sparkles, Hash
} from 'lucide-react';
import { generateImage } from '../services/geminiService';
import { useLocalStorage } from '../hooks/useLocalStorage';

const STYLE_PRESETS = [
  'None', 'Photorealistic', 'Digital Art', 'Oil Painting',
  'Anime', 'Watercolor', '3D Render', 'Pixel Art', 'Comic Book',
];

const ASPECT_RATIOS = [
  { label: '1:1', w: 16, h: 16 },
  { label: '16:9', w: 20, h: 11 },
  { label: '9:16', w: 11, h: 20 },
  { label: '4:3', w: 18, h: 14 },
];

const SUGGESTIONS = [
  'A cyberpunk city street at night with neon rain reflections',
  'A cute robot gardening on Mars at sunset, digital art',
  'Portrait of a cat wearing renaissance noble clothes, oil painting',
  'A floating island with a waterfall in the sky, fantasy style',
  'An underwater temple glowing with bioluminescent coral',
  'A tiny astronaut sitting on a crescent moon, watercolor',
];

export default function GeneratePage() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [seed, setSeed] = useState('');
  const [style, setStyle] = useState('None');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [currentImage, setCurrentImage] = useState(null);
  const [error, setError] = useState(null);
  const [seedCopied, setSeedCopied] = useState(false);
  const [history, setHistory] = useLocalStorage('imagein_history', []);
  const [searchParams] = useSearchParams();

  // Pre-fill from URL params (used by History re-use)
  useEffect(() => {
    const p = searchParams.get('prompt');
    const s = searchParams.get('seed');
    const st = searchParams.get('style');
    const ar = searchParams.get('aspect');
    if (p) setPrompt(p);
    if (s) setSeed(s);
    if (st && STYLE_PRESETS.includes(st)) setStyle(st);
    if (ar) setAspectRatio(ar);
  }, []);

  const randomizeSeed = () => {
    setSeed(String(Math.floor(Math.random() * 2147483647)));
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setStatus('loading');
    setError(null);

    try {
      const result = await generateImage(prompt, {
        seed: seed || undefined,
        aspectRatio,
        stylePreset: style,
      });

      const generation = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        prompt,
        seed: result.seed,
        stylePreset: style,
        aspectRatio,
        imageUrl: result.imageUrl,
        timestamp: Date.now(),
      };

      setCurrentImage(generation);
      setSeed(String(result.seed));
      setStatus('success');

      // Save to history
      setHistory((prev) => [generation, ...prev].slice(0, 50));
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      setStatus('error');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const handleDownload = () => {
    if (!currentImage) return;
    const link = document.createElement('a');
    link.href = currentImage.imageUrl;
    const safeName = currentImage.prompt.slice(0, 25).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `imageIN-${safeName}-${currentImage.seed}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySeed = () => {
    if (currentImage) {
      navigator.clipboard.writeText(String(currentImage.seed));
      setSeedCopied(true);
      setTimeout(() => setSeedCopied(false), 2000);
    }
  };

  return (
    <div className="container">
      <div className="generate-layout">
        {/* ── Left Panel: Controls ──────────────────────── */}
        <div className="controls-panel">
          {/* Prompt */}
          <div className="panel-card">
            <div className="panel-title">
              <Wand2 size={18} />
              Create
            </div>
            <div style={{ position: 'relative' }}>
              <textarea
                className="input textarea"
                placeholder="Describe what you want to see..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={status === 'loading'}
              />
              <span className="char-counter">{prompt.length}</span>
            </div>

            {error && (
              <div className="error-box" style={{ marginTop: 'var(--space-md)' }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: 'var(--space-md)' }}
              onClick={handleGenerate}
              disabled={!prompt.trim() || status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <span className="loading-spinner" style={{ width: 20, height: 20 }}>
                    <span className="loading-spinner-inner" style={{ width: 14, height: 14 }} />
                  </span>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate Image
                </>
              )}
            </button>
          </div>

          {/* Style Presets */}
          <div className="panel-card">
            <div className="panel-title">
              <Sparkles size={16} />
              Style
            </div>
            <div className="style-grid">
              {STYLE_PRESETS.map((s) => (
                <button
                  key={s}
                  className={`style-chip ${style === s ? 'active' : ''}`}
                  onClick={() => setStyle(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div className="panel-card">
            <div className="panel-title">
              <ImageIcon size={16} />
              Aspect Ratio
            </div>
            <div className="aspect-grid">
              {ASPECT_RATIOS.map((ar) => (
                <button
                  key={ar.label}
                  className={`aspect-chip ${aspectRatio === ar.label ? 'active' : ''}`}
                  onClick={() => setAspectRatio(ar.label)}
                >
                  <span
                    className="aspect-preview"
                    style={{ width: ar.w, height: ar.h }}
                  />
                  {ar.label}
                </button>
              ))}
            </div>
          </div>

          {/* Seed */}
          <div className="panel-card">
            <div className="panel-title">
              <Hash size={16} />
              Seed
            </div>
            <div className="seed-row">
              <input
                type="number"
                className="input seed-input"
                placeholder="Random seed (leave empty for random)"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
              />
              <button
                className="seed-random-btn tooltip"
                data-tooltip="Randomize"
                onClick={randomizeSeed}
              >
                <Dice5 size={18} />
              </button>
            </div>
          </div>

          {/* Suggestions */}
          <div className="panel-card" style={{ border: 'none', background: 'transparent', padding: 0 }}>
            <div className="label" style={{ paddingLeft: 'var(--space-xs)' }}>
              Try these prompts
            </div>
            <div className="suggestions">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  className="suggestion-btn"
                  onClick={() => setPrompt(s)}
                  disabled={status === 'loading'}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Panel: Display ──────────────────────── */}
        <div className="display-area">
          {status === 'loading' ? (
            <div className="loading-container">
              <div className="loading-spinner">
                <div className="loading-spinner-inner" />
              </div>
              <div className="loading-text">Generating your image...</div>
              <div className="loading-subtext">This may take a few seconds</div>
            </div>
          ) : currentImage ? (
            <div className="generated-image-container">
              <div className="image-info">
                <span className="image-badge">🌱 Seed: {currentImage.seed}</span>
                {currentImage.stylePreset !== 'None' && (
                  <span className="image-badge">🎨 {currentImage.stylePreset}</span>
                )}
                <span className="image-badge">📐 {currentImage.aspectRatio}</span>
              </div>
              <img
                src={currentImage.imageUrl}
                alt={currentImage.prompt}
                className="generated-image"
              />
              <div className="image-actions">
                <button className="btn btn-secondary btn-sm" onClick={handleDownload}>
                  <Download size={15} />
                  Download
                </button>
                <button className="btn btn-secondary btn-sm" onClick={handleCopySeed}>
                  {seedCopied ? <Check size={15} /> : <Copy size={15} />}
                  {seedCopied ? 'Copied!' : 'Copy Seed'}
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => window.open(currentImage.imageUrl, '_blank')}
                >
                  <Maximize2 size={15} />
                </button>
              </div>
            </div>
          ) : (
            <div className="display-placeholder">
              <div className="display-placeholder-icon">
                <ImageIcon size={32} />
              </div>
              <h3>Your canvas is empty</h3>
              <p>
                Enter a detailed prompt on the left and click Generate to create
                stunning visuals with Gemini AI.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
