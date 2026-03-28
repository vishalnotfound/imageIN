import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} imageIN. Powered by Gemini AI. Generated content may be inaccurate.</p>
      </div>
    </footer>
  );
}
