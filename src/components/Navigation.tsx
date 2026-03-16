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
          ? 'rgba(10, 10, 15, 0.95)'
          : 'rgba(10, 10, 15, 0.85)',
      }}
    >
      <div className="nav__inner">
        <Link href="/" className="nav__logo">
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
