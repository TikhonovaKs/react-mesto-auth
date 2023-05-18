import React from 'react';
import headerLogo from '../images/header-logo.svg';

function Header() {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип Место" className="logo" />
    </header>
  );
}

export default Header;
