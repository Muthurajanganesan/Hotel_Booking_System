// Navbar.js
// Shared navigation bar for the Hotel Booking System
// Uses light-blue primary theme as defined in the design system

import React, { useState } from 'react';
import './Navbar.css';

/**
 * Props:
 *   activeModule – string: 'hotels' | 'browse' | 'bookings' | 'admin'
 *   onNavigate(module) – callback when a nav link is clicked
 */
const Navbar = ({ activeModule = 'hotels', onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { key: 'hotels',   label: '🏨 Hotels',   id: 'nav-hotels' },
    { key: 'browse',   label: '🔍 Browse',   id: 'nav-browse' },
    { key: 'bookings', label: '📅 Bookings', id: 'nav-bookings' },
    { key: 'admin',    label: '⚙️ Admin',    id: 'nav-admin' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="navbar-brand" id="nav-logo">
          <span className="brand-icon">🏨</span>
          <span className="brand-name">VerseHotel</span>
        </div>

        {/* Desktop nav links */}
        <ul className="navbar-links">
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                id={item.id}
                className={`nav-link ${activeModule === item.key ? 'nav-link--active' : ''}`}
                onClick={() => onNavigate && onNavigate(item.key)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Login / Profile area (placeholder for auth team) */}
        <div className="navbar-actions">
          <button id="nav-login" className="nav-btn-login">Login</button>
        </div>

        {/* Mobile hamburger */}
        <button
          id="nav-hamburger"
          className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`mobile-nav-link ${activeModule === item.key ? 'active' : ''}`}
              onClick={() => { onNavigate && onNavigate(item.key); setMenuOpen(false); }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
