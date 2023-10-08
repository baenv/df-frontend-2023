'use client'

import React, { useContext, useEffect, useState } from 'react'

import Link from 'next/link'

import { ThemeContext } from './Context'
import { cacheTheme } from './Utils'

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const [themeTag, setThemeTag] = useState(theme === 'dark' ? 'Dark' : 'Light')

  useEffect(() => {
    setTheme(theme === 'dark' ? 'dark' : 'light')
    setThemeTag(theme === 'dark' ? 'Dark' : 'Light')
  }, [setTheme, theme])

  const toggleTheme = () => {
    cacheTheme(theme === 'light' ? 'dark' : 'light')
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="headerContainer">
      <div className="headerLogo">
        <Link href="/">Bookstore</Link>
      </div>
      <div className="user-info">
        <img
          src="https://www.gstatic.com/android/keyboard/emojikitchen/20220406/u1f352/u1f352_u1f431.png?fbx"
          alt=""
        />
        <span>Bean</span>
      </div>
      {/* <div className="headerNav" id="headerNav-01"> */}
      {/* Navigation links can be added here */}
      {/* </div> */}
      <div className="theme-toggle">
        <label htmlFor="toggleTheme" className="switch">
          <input id="toggleTheme" type="checkbox" onClick={toggleTheme} />
          <span className="slider round" />
        </label>
      </div>
      <span>{themeTag}</span>
    </div>
  )
}

export default Header
