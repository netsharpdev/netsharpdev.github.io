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
            <line x1="14" y1="62" x2="14" y2="10" stroke="#00D4AA" strokeWidth="3" strokeLinecap="round"/>
            <line x1="14" y1="10" x2="58" y2="62" stroke="#00D4AA" strokeWidth="3" strokeLinecap="round"/>
            <line x1="58" y1="62" x2="58" y2="10" stroke="#00D4AA" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="14" cy="10" r="5" fill="#00D4AA"/>
            <circle cx="14" cy="62" r="5" fill="#00D4AA"/>
            <circle cx="58" cy="10" r="5" fill="#00D4AA"/>
            <circle cx="58" cy="62" r="5" fill="#00D4AA"/>
          </svg>
          net<span>sharp</span>dev
        </Link>
        <ul className={`nav__links${menuOpen ? ' active' : ''}`}>
          {links.map((link) => (
            <li key={link.url}>
              <Link
                href={link.url}
                className={`nav__link${pathname === link.url ? ' nav__link--active' : ''}`}
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
