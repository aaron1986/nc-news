import React, { useState } from 'react';

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const handleBurgerClick = () => {
    setMenuActive(prevState => !prevState);
  };

  return (
    <header>
      <div 
        id="burger-menu" 
        className="burger-menu" 
        onClick={handleBurgerClick}
      >
        ☰
      </div>
      <ul 
        id="nav-links" 
        className={menuActive ? 'active' : ''}
      >
        <li><a href="/">Home</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/about">About</a></li>
      </ul>

      <h2>Search API for Articles</h2>
    </header>
  );
}
