import './App.css';

import { useEffect, useState } from 'react';

import BookTable from './BookTable';
import {
  ListVisibleBooksContext,
  OpenAddBookPopupContext,
  OpenDeleteBookPopupContext,
  PaginationContext,
  SearchContext,
  ThemeContext,
} from './Context';
import Feature from './Feature';
import Footer from './Footer';
import Header from './Header';
import { BooksWithPagination } from './Model';
import PaginationArea from './PaginationArea';
import PopupAddBook from './PopupAddBook';
import PopupDeleteBook from './PopupDeleteBook';
import {
  cacheTheme,
  getBooksByPage,
  retrievePaginationFromLocalStorage,
  retrieveTheme,
  saveBooksToLocalStorage,
} from './Utils';

function App() {
  const pagination = retrievePaginationFromLocalStorage();
  const cachedTheme = retrieveTheme();

  const [openAddBookPopup, setOpenAddBookPopup] = useState(false);
  const [openDeleteBookPopup, setOpenDeleteBookPopup] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState(pagination);
  const [bookData, setBookData] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState(cachedTheme || 'light');

  useEffect(() => {
    const pagination = retrievePaginationFromLocalStorage();
    const { totalBooks } = getBooksByPage(pagination, '');

    if (totalBooks === 0) {
      saveBooksToLocalStorage(mockData);
      pagination.totalBooks = retrievePaginationFromLocalStorage().totalBooks;
      setPaginationInfo(pagination);
    }

    cacheTheme(theme);

    const { data } = getBooksByPage(pagination, '') as BooksWithPagination;
    setBookData(data as never[]);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
        <OpenAddBookPopupContext.Provider
          value={{ openAddBookPopup, setOpenAddBookPopup }}
        >
          <ListVisibleBooksContext.Provider value={{ bookData, setBookData }}>
            <OpenDeleteBookPopupContext.Provider
              value={{ openDeleteBookPopup, setOpenDeleteBookPopup }}
            >
              <PaginationContext.Provider
                value={{ paginationInfo, setPaginationInfo }}
              >
                <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
                  <Header />
                  <Feature />
                  <BookTable setSelectedBook={setSelectedBook} />
                  <PopupAddBook />
                  <PopupDeleteBook selectedBook={selectedBook} />
                  <PaginationArea />
                  <Footer />
                </SearchContext.Provider>
              </PaginationContext.Provider>
            </OpenDeleteBookPopupContext.Provider>
          </ListVisibleBooksContext.Provider>
        </OpenAddBookPopupContext.Provider>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

const mockData = [
  { id: 1, name: 'Book 1', author: 'Author 1', topic: 'Science' },
  { id: 2, name: 'Book 2', author: 'Author 2', topic: 'Fiction' },
  { id: 3, name: 'Book 3', author: 'Author 3', topic: 'Fantasy' },
  { id: 4, name: 'Book 4', author: 'Author 4', topic: 'Mystery' },
  { id: 5, name: 'Book 5', author: 'Author 5', topic: 'Romance' },
  { id: 6, name: 'Book 6', author: 'Author 6', topic: 'Adventure' },
  { id: 7, name: 'Book 7', author: 'Author 7', topic: 'Horror' },
  { id: 8, name: 'Book 8', author: 'Author 8', topic: 'Biography' },
  { id: 9, name: 'Book 9', author: 'Author 9', topic: 'History' },
  { id: 10, name: 'Book 10', author: 'Author 10', topic: 'Self-Help' },
  { id: 11, name: 'Book 11', author: 'Author 11', topic: 'Science' },
  { id: 12, name: 'Book 12', author: 'Author 12', topic: 'Fiction' },
  { id: 13, name: 'Book 13', author: 'Author 13', topic: 'Fantasy' },
  { id: 14, name: 'Book 14', author: 'Author 14', topic: 'Mystery' },
  { id: 15, name: 'Book 15', author: 'Author 15', topic: 'Romance' },
  { id: 16, name: 'Book 16', author: 'Author 16', topic: 'Adventure' },
  { id: 17, name: 'Book 17', author: 'Author 17', topic: 'Horror' },
  { id: 18, name: 'Book 18', author: 'Author 18', topic: 'Biography' },
  { id: 19, name: 'Book 19', author: 'Author 19', topic: 'History' },
  { id: 20, name: 'Book 20', author: 'Author 20', topic: 'Self-Help' },
  { id: 21, name: 'Book 21', author: 'Author 21', topic: 'Science' },
  { id: 22, name: 'Book 22', author: 'Author 22', topic: 'Fiction' },
  { id: 23, name: 'Book 23', author: 'Author 23', topic: 'Fantasy' },
  { id: 24, name: 'Book 24', author: 'Author 24', topic: 'Mystery' },
  { id: 25, name: 'Book 25', author: 'Author 25', topic: 'Romance' },
  { id: 26, name: 'Book 26', author: 'Author 26', topic: 'Adventure' },
  { id: 27, name: 'Book 27', author: 'Author 27', topic: 'Horror' },
  { id: 28, name: 'Book 28', author: 'Author 28', topic: 'Biography' },
  { id: 29, name: 'Book 29', author: 'Author 29', topic: 'History' },
  { id: 30, name: 'Book 30', author: 'Author 30', topic: 'Self-Help' },
  { id: 31, name: 'Book 31', author: 'Author 31', topic: 'Science' },
  { id: 32, name: 'Book 32', author: 'Author 32', topic: 'Fiction' },
  { id: 33, name: 'Book 33', author: 'Author 33', topic: 'Fantasy' },
  { id: 34, name: 'Book 34', author: 'Author 34', topic: 'Mystery' },
  { id: 35, name: 'Book 35', author: 'Author 35', topic: 'Romance' },
  { id: 36, name: 'Book 36', author: 'Author 36', topic: 'Adventure' },
  { id: 37, name: 'Book 37', author: 'Author 37', topic: 'Horror' },
  { id: 38, name: 'Book 38', author: 'Author 38', topic: 'Biography' },
  { id: 39, name: 'Book 39', author: 'Author 39', topic: 'History' },
  { id: 40, name: 'Book 40', author: 'Author 40', topic: 'Self-Help' },
  { id: 41, name: 'Book 41', author: 'Author 41', topic: 'Science' },
  { id: 42, name: 'Book 42', author: 'Author 42', topic: 'Fiction' },
  { id: 43, name: 'Book 43', author: 'Author 43', topic: 'Fantasy' },
  { id: 44, name: 'Book 44', author: 'Author 44', topic: 'Mystery' },
  { id: 45, name: 'Book 45', author: 'Author 45', topic: 'Romance' },
  { id: 46, name: 'Book 46', author: 'Author 46', topic: 'Adventure' },
  { id: 47, name: 'Book 47', author: 'Author 47', topic: 'Horror' },
  { id: 48, name: 'Book 48', author: 'Author 48', topic: 'Biography' },
  { id: 49, name: 'Book 49', author: 'Author 49', topic: 'History' },
  { id: 50, name: 'Book 50', author: 'Author 50', topic: 'Self-Help' },
  { id: 51, name: 'Book 51', author: 'Author 51', topic: 'Science' },
  { id: 52, name: 'Book 52', author: 'Author 52', topic: 'Fiction' },
  { id: 53, name: 'Book 53', author: 'Author 53', topic: 'Fantasy' },
  { id: 54, name: 'Book 54', author: 'Author 54', topic: 'Mystery' },
  { id: 55, name: 'Book 55', author: 'Author 55', topic: 'Romance' },
  { id: 56, name: 'Book 56', author: 'Author 56', topic: 'Adventure' },
  { id: 57, name: 'Book 57', author: 'Author 57', topic: 'Horror' },
  { id: 58, name: 'Book 58', author: 'Author 58', topic: 'Biography' },
  { id: 59, name: 'Book 59', author: 'Author 59', topic: 'History' },
  { id: 60, name: 'Book 60', author: 'Author 60', topic: 'Self-Help' },
  { id: 61, name: 'Book 61', author: 'Author 61', topic: 'Science' },
  { id: 62, name: 'Book 62', author: 'Author 62', topic: 'Fiction' },
  { id: 63, name: 'Book 63', author: 'Author 63', topic: 'Fantasy' },
  { id: 64, name: 'Book 64', author: 'Author 64', topic: 'Mystery' },
  { id: 65, name: 'Book 65', author: 'Author 65', topic: 'Romance' },
  { id: 66, name: 'Book 66', author: 'Author 66', topic: 'Adventure' },
];
