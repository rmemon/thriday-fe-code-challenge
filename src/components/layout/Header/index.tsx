import React from 'react';
import logo from '../../../assets/logo.svg';
import './styles.css';

/**
 * App Header Component
 * 
 * Displays the main header section of the application containing the Thriday logo.
 * The header uses a dark green background (--primary-color) and is full-width.
 * The logo is centered within a container for consistent spacing.
 */
const Header: React.FC = () => (
  <header className="header">
    <div className="container">
      <img src={logo} alt="Thriday Code Challenge" />
    </div>
  </header>
);

export default Header;
