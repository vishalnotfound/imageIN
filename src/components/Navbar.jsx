import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Image, Clock, Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home', icon: Sparkles },
    { to: '/generate', label: 'Create', icon: Image },
    { to: '/history', label: 'History', icon: Clock },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <Sparkles size={18} />
          </div>
          <span className="gradient-text">imageIN</span>
        </Link>

        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar-link ${location.pathname === link.to ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/generate"
            className="btn btn-primary btn-sm"
            style={{ marginLeft: '0.5rem' }}
            onClick={() => setMobileOpen(false)}
          >
            <Sparkles size={14} />
            Generate
          </Link>
        </div>
      </div>
    </nav>
  );
}
