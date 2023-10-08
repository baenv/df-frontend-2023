'use client'

import { useEffect, useMemo, useState } from 'react'

import Link from 'next/link'

import { OpenDeleteBookPopupContext, ThemeContext } from '../../comp/Context'
import Header from '../../comp/Header'
import PopupDeleteBook from '../../comp/PopupDeleteBook'
import {
  cacheTheme,
  findBookById,
  getBooksFromLocalStorage,
  retrieveTheme,
} from '../../comp/Utils'

export default function Page({ params }: { params: { id: string } }) {
  const cachedTheme = retrieveTheme()

  const [openDeleteBookPopup, setOpenDeleteBookPopup] = useState(false)
  const [theme, setTheme] = useState(cachedTheme || 'light')
  const [selectedBook, setSelectedBook] = useState({})
  const [currentBook, setCurrentBook] = useState({
    id: 0,
    name: '',
    author: '',
    topic: '',
  })

  const themeContextValue = useMemo(
    () => ({ theme, setTheme }),
    [theme, setTheme],
  )

  const books = getBooksFromLocalStorage() || []
  const bookID = parseInt(params.id.substring(0, params.id.length), 10)
  const book = findBookById(books, bookID)

  useEffect(() => {
    cacheTheme(theme)

    if (book) {
      setCurrentBook(book)
    }
  }, [])
  const deleteBookPopupContextValue = useMemo(
    () => ({ openDeleteBookPopup, setOpenDeleteBookPopup }),
    [openDeleteBookPopup, setOpenDeleteBookPopup],
  )

  return (
    <OpenDeleteBookPopupContext.Provider value={deleteBookPopupContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
          <Header />
          <PopupDeleteBook selectedBook={selectedBook} />
          <div className="bookDetail">
            <img
              src="https://marketplace.canva.com/EAD5DLrZ1DE/1/0/1024w/canva-xanh-m%C3%B2ng-k%C3%A9t-v%C3%A0-h%E1%BB%93ng-b%C3%A1nh-donut-th%E1%BB%A9c-%C4%83n-nh%E1%BA%ADt-k%C3%BD-s%C3%A1ch-b%C3%ACa-Zlr77mT-27w.jpg"
              alt="Book Cover"
            />
            <h1 className="bookName">{currentBook.name}</h1>
            <p className="author">{currentBook.author}</p>
            <p className="topic">{currentBook.topic}</p>
            <p className="description">
              In the quiet, tranquil meadow, the sun cast its golden rays upon
              the swaying wildflowers, painting a picturesque scene of
              nature&#39;s beauty. Birds chirped melodiously in the treetops,
              while a gentle breeze rustled the leaves, creating a soothing
              symphony of sounds. As I walked through this idyllic landscape, I
              couldn&#39;t help but feel a profound sense of peace and
              connection with the natural world. Each step I took seemed to
              carry me further into a serene realm, far removed from the hustle
              and bustle of daily life. It was a moment of pure serenity, a
              reminder of the beauty that surrounds us when we take the time to
              pause and appreciate it.
            </p>
            <Link className="notFoundLink" href="/">
              &lsaquo;Back to home page
            </Link>
            <button
              className="btn"
              onClick={() => {
                setOpenDeleteBookPopup(true)
                setSelectedBook(currentBook)
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </ThemeContext.Provider>
    </OpenDeleteBookPopupContext.Provider>
  )
}
