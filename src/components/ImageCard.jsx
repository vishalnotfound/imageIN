import React from 'react';
import { Download, RotateCcw, Trash2, Copy } from 'lucide-react';

export default function ImageCard({ generation, onReuse, onDelete }) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generation.imageUrl;
    const safePrompt = generation.prompt.slice(0, 25).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `imageIN-${safePrompt}-${generation.seed}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySeed = () => {
    navigator.clipboard.writeText(String(generation.seed));
  };

  const timeAgo = (ts) => {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="history-card">
      <img
        src={generation.imageUrl}
        alt={generation.prompt}
        className="history-card-image"
        loading="lazy"
      />
      <div className="history-card-body">
        <p className="history-card-prompt">{generation.prompt}</p>
        <div className="history-card-meta">
          <div className="history-card-tags">
            <span className="history-card-tag" title="Seed" onClick={handleCopySeed} style={{ cursor: 'pointer' }}>
              🌱 {generation.seed}
            </span>
            {generation.stylePreset && generation.stylePreset !== 'None' && (
              <span className="history-card-tag">🎨 {generation.stylePreset}</span>
            )}
            <span className="history-card-tag" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
              {timeAgo(generation.timestamp)}
            </span>
          </div>
          <div className="history-card-actions">
            {onReuse && (
              <button className="history-card-action tooltip" data-tooltip="Re-generate" onClick={() => onReuse(generation)}>
                <RotateCcw size={15} />
              </button>
            )}
            <button className="history-card-action tooltip" data-tooltip="Download" onClick={handleDownload}>
              <Download size={15} />
            </button>
            {onDelete && (
              <button className="history-card-action delete tooltip" data-tooltip="Delete" onClick={() => onDelete(generation.id)}>
                <Trash2 size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
