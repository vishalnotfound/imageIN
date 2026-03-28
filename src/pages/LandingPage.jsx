import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Wand2, History, Palette, Ratio, Hash, Zap, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    icon: Wand2,
    iconClass: 'feature-icon-violet',
    title: 'AI-Powered Generation',
    desc: 'Transform text descriptions into stunning visuals using Google\'s Gemini AI model.',
  },
  {
    icon: Hash,
    iconClass: 'feature-icon-pink',
    title: 'Seed Control',
    desc: 'Track and reproduce every creation with unique seeds for consistent results.',
  },
  {
    icon: Palette,
    iconClass: 'feature-icon-cyan',
    title: 'Style Presets',
    desc: 'Choose from photorealistic, anime, digital art, watercolor, and more styles.',
  },
  {
    icon: Ratio,
    iconClass: 'feature-icon-blue',
    title: 'Aspect Ratios',
    desc: 'Generate images in portrait, landscape, or square — perfect for any use case.',
  },
  {
    icon: History,
    iconClass: 'feature-icon-violet',
    title: 'Generation History',
    desc: 'All your creations saved locally. Re-use prompts and seeds anytime.',
  },
  {
    icon: Zap,
    iconClass: 'feature-icon-pink',
    title: 'Instant Results',
    desc: 'Get high-quality images in seconds. Download or share them instantly.',
  },
];

const SAMPLE_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
];

const SAMPLE_EMOJIS = ['🌌', '🎨', '🏔️', '🌊', '🦋', '🌺', '🐉', '✨'];

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            Powered by Gemini AI
          </div>

          <h1 className="hero-title">
            Turn Your <span className="gradient-text">Imagination</span> Into{' '}
            <span className="gradient-text-secondary">Stunning Art</span>
          </h1>

          <p className="hero-subtitle">
            Create breathtaking images from simple text descriptions. With seed tracking,
            style presets, and aspect ratio control — your creativity has no limits.
          </p>

          <div className="hero-actions">
            <Link to="/generate" className="btn btn-primary btn-lg">
              <Wand2 size={18} />
              Start Creating
            </Link>
            <a href="#features" className="btn btn-secondary btn-lg">
              Explore Features
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">∞</div>
              <div className="hero-stat-label">Possible Creations</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">6+</div>
              <div className="hero-stat-label">Style Presets</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">4</div>
              <div className="hero-stat-label">Aspect Ratios</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section features-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <Zap size={12} />
              Features
            </div>
            <h2 className="section-title">
              Everything You Need to <span className="gradient-text">Create</span>
            </h2>
            <p className="section-subtitle">
              Professional-grade image generation tools, right in your browser.
            </p>
          </div>

          <div className="features-grid">
            {FEATURES.map((feature, i) => (
              <div key={i} className="feature-card">
                <div className={`feature-icon ${feature.iconClass}`}>
                  <feature.icon size={22} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <Palette size={12} />
              Showcase
            </div>
            <h2 className="section-title">
              What You Can <span className="gradient-text-secondary">Create</span>
            </h2>
            <p className="section-subtitle">
              From photorealistic scenes to anime characters — the possibilities are endless.
            </p>
          </div>

          <div className="gallery-grid">
            {SAMPLE_GRADIENTS.map((gradient, i) => (
              <div key={i} className="gallery-item">
                <div
                  className="gallery-gradient"
                  style={{ background: gradient }}
                >
                  {SAMPLE_EMOJIS[i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-bg" />
        <div className="container cta-content">
          <h2 className="cta-title">
            Ready to Bring Your Ideas to <span className="gradient-text">Life</span>?
          </h2>
          <p className="cta-subtitle">
            Start generating stunning images in seconds — no account required.
          </p>
          <Link to="/generate" className="btn btn-primary btn-lg">
            <Wand2 size={18} />
            Start Creating Now
          </Link>
        </div>
      </section>
    </>
  );
}
