'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { text: 'Home', url: '/' },
  { text: 'About', url: '/about' },
  { text: 'Portfolio', url: '/portfolio' },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="nav"
      id="top"
      style={{
        background: scrolled
          ? 'rgba(5, 5, 7, 0.95)'
          : 'rgba(5, 5, 7, 0.85)',
      }}
    >
      <div className="nav__inner">
        <Link href="/" className="nav__logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="28" height="28" viewBox="0 0 72 72" aria-hidden="true">
            <defs>
              <linearGradient id="logoGradNav" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D4AA"/>
                <stop offset="100%" stopColor="#3B82F6"/>
              </linearGradient>
              <filter id="glowNav">
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <line x1="14" y1="62" x2="14" y2="10" stroke="url(#logoGradNav)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="14" y1="10" x2="58" y2="62" stroke="url(#logoGradNav)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="58" y1="62" x2="58" y2="10" stroke="url(#logoGradNav)" strokeWidth="3" strokeLinecap="round"/>
            <line x1="14" y1="36" x2="58" y2="36" stroke="url(#logoGradNav)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" opacity="0.3"/>
            <line x1="36" y1="10" x2="36" y2="62" stroke="url(#logoGradNav)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" opacity="0.3"/>
            <circle cx="14" cy="10" r="5" fill="#00D4AA" filter="url(#glowNav)"/>
            <circle cx="14" cy="62" r="5" fill="#1EABD0" filter="url(#glowNav)"/>
            <circle cx="58" cy="10" r="5" fill="#1EABD0" filter="url(#glowNav)"/>
            <circle cx="58" cy="62" r="5" fill="#3B82F6" filter="url(#glowNav)"/>
          </svg>
          <span style={{display:'inline-flex'}}><span style={{color:'#00D4AA'}}>net</span><span style={{background:'linear-gradient(90deg,#00D4AA,#3B82F6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>sharp</span><span style={{color:'#3B82F6'}}>dev</span></span>
        </Link>
        <ul className={`nav__links${menuOpen ? ' active' : ''}`}>
          {links.map((link) => (
            <li key={link.url}>
              <Link
                href={link.url}
                className={`nav__link${pathname.replace(/\/$/, '') === link.url.replace(/\/$/, '') ? ' nav__link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className={`nav__toggle${menuOpen ? ' active' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
