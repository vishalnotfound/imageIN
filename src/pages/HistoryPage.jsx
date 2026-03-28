import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Trash2, Wand2, Image as ImageIcon } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import ImageCard from '../components/ImageCard';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useLocalStorage('imagein_history', []);

  const handleDelete = (id) => {
    setHistory((prev) => prev.filter((g) => g.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all generation history? This cannot be undone.')) {
      setHistory([]);
    }
  };

  const handleReuse = (generation) => {
    // Navigate to generate page with pre-filled data via URL search params
    const params = new URLSearchParams({
      prompt: generation.prompt,
      seed: String(generation.seed),
      style: generation.stylePreset || 'None',
      aspect: generation.aspectRatio || '1:1',
    });
    navigate(`/generate?${params.toString()}`);
  };

  return (
    <div className="container history-page">
      <div className="history-header">
        <div>
          <h1 className="history-title">
            <Clock size={24} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem', color: 'var(--accent-purple)' }} />
            Generation History
          </h1>
          <p className="history-count">{history.length} generation{history.length !== 1 ? 's' : ''} saved locally</p>
        </div>
        {history.length > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={handleClearAll} style={{ color: '#ef4444' }}>
            <Trash2 size={14} />
            Clear All
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="history-grid">
          {history.map((gen) => (
            <ImageCard
              key={gen.id}
              generation={gen}
              onReuse={handleReuse}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="history-empty">
          <div className="history-empty-icon">
            <ImageIcon size={32} style={{ opacity: 0.4 }} />
          </div>
          <h3>No generations yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-xl)' }}>
            Your generated images will appear here. Start creating to build your collection.
          </p>
          <Link to="/generate" className="btn btn-primary">
            <Wand2 size={16} />
            Start Creating
          </Link>
        </div>
      )}
    </div>
  );
}
