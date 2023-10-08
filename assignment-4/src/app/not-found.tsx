'use client'

import { useMemo, useState } from 'react'

import Link from 'next/link'

import { ThemeContext } from './comp/Context'
import Header from './comp/Header'
import { retrieveTheme } from './comp/Utils'

const NotFound = () => {
  const cachedTheme = retrieveTheme()
  const [theme, setTheme] = useState(cachedTheme || 'light')

  const themeContextValue = useMemo(
    () => ({ theme, setTheme }),
    [theme, setTheme],
  )

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
        <Header />
        <div className="notFound">
          <div className="notFoundTextArea">
            <h1>404</h1>
            <p>Page not found</p>
            <Link className="notFoundLink" href="/">
              &lsaquo;Back to home page
            </Link>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default NotFound
