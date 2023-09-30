import React from 'react';

import { Book, Pagination } from './Model';

export interface OpenAddBookPopupContextType {
  openAddBookPopup: boolean
  setOpenAddBookPopup: React.Dispatch<React.SetStateAction<boolean>>
}

export const OpenAddBookPopupContext =
  React.createContext<OpenAddBookPopupContextType>({
    openAddBookPopup: false,
    setOpenAddBookPopup: () => {},
  });

export interface ListVisibleBooksContextType {
  bookData: Book[]
  setBookData: React.Dispatch<React.SetStateAction<never[]>>
}

export const ListVisibleBooksContext =
  React.createContext<ListVisibleBooksContextType>({
    bookData: [],
    setBookData: () => {},
  });

export interface OpenDeleteBookPopupContextType {
  openDeleteBookPopup: boolean
  setOpenDeleteBookPopup: React.Dispatch<React.SetStateAction<boolean>>
}
export const OpenDeleteBookPopupContext =
  React.createContext<OpenDeleteBookPopupContextType>({
    openDeleteBookPopup: false,
    setOpenDeleteBookPopup: () => {},
  });

export interface PaginationContextType {
  paginationInfo: Pagination
  setPaginationInfo: React.Dispatch<React.SetStateAction<Pagination>>
}
export const PaginationContext = React.createContext<PaginationContextType>({
  paginationInfo: {
    currentPage: 1,
    booksPerPage: 5,
    totalBooks: 0,
  },
  setPaginationInfo: () => {},
});

export interface SearchContextType {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export const SearchContext = React.createContext<SearchContextType>({
  searchTerm: '',
  setSearchTerm: () => {},
});

export interface ThemeContextType {
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: '',
  setTheme: () => {},
});
