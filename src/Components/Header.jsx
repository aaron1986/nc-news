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
        <li><a href="#">Contact</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </header>
  );
}
