import React, { useContext } from 'react';

import { ThemeContext } from './Context';
import { cacheTheme } from './Utils';

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    cacheTheme(theme === 'light' ? 'dark' : 'light');
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`header-container`}>
      <div className="header-logo">
        <a href="index.html">Bookstore</a>
      </div>
      <div className="user-info">
        <img src="https://www.gstatic.com/android/keyboard/emojikitchen/20220406/u1f352/u1f352_u1f431.png?fbx" alt="" />
        <span>Bean</span>
      </div>
      <div className="header-nav" id="header-nav-01">
        {/* Navigation links can be added here */}
      </div>
      <div className="theme-toggle">
        <label className="switch">
          <input type="checkbox" onClick={toggleTheme} />
          <span className="slider round"></span>
        </label>
      </div>
      <span>{(theme === 'dark') ? 'Dark' : 'Light'}</span>
    </div>
  );
};

export default Header;
