import { Book, BooksWithPagination, Pagination } from './Model'

export function getBooksFromLocalStorage(): Book[] {
  if (typeof window !== 'undefined') {
    const storedBooksString = localStorage.getItem('books')
    const storedBooks = storedBooksString ? JSON.parse(storedBooksString) : []
    return Array.isArray(storedBooks) ? storedBooks : []
  }
  return []
}

export function findBookById(books: Book[], id: number): Book | undefined {
  return books.find((book) => {
    return book.id === id
  })
}

export function generateNewBookId(): number {
  const books = getBooksFromLocalStorage()
  const lastBook = books[books.length - 1]
  return lastBook ? lastBook.id + 1 : 1
}

export function addBookToLocalStorage(book: Book): Book[] {
  const books = getBooksFromLocalStorage()
  books.push(book)
  saveBooksToLocalStorage(books)

  return books
}

export function saveBooksToLocalStorage(books: Book[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('books', JSON.stringify(books))
  }
}

export function findBookIndexById(books: Book[], id: number): number {
  return books.findIndex((book) => {
    return book.id === id
  })
}

export function deleteBookByID(id: number): Book[] {
  const books = getBooksFromLocalStorage()
  const index = findBookIndexById(books, id)

  if (index !== -1) {
    books.splice(index, 1)
    saveBooksToLocalStorage(books)
  }

  return books
}

export function getBooksByPage(
  pagination: Pagination,
  filterPattern: string,
): BooksWithPagination {
  let books = getBooksFromLocalStorage()
  if (filterPattern) {
    books = books.filter((book) => {
      return book.name.toLowerCase().includes(filterPattern.toLowerCase())
    })
  }

  const totalBooks = books.length
  const startIndex = (pagination.currentPage - 1) * pagination.booksPerPage
  const endIndex =
    startIndex + pagination.booksPerPage <= totalBooks
      ? startIndex + pagination.booksPerPage
      : totalBooks

  return {
    data: books.slice(startIndex, endIndex),
    totalBooks,
    currentPage: pagination.currentPage,
  }
}

export function retrievePaginationFromLocalStorage(): Pagination {
  if (typeof window !== 'undefined') {
    const storedPagination = localStorage.getItem('pagination') || '{}'
    let currentPagination = JSON.parse(storedPagination)
    if (!currentPagination?.currentPage) {
      currentPagination = {
        currentPage: 1,
        booksPerPage: 5,
        totalBooks: 0,
      }
    }

    const books = getBooksFromLocalStorage()

    currentPagination.totalBooks = books.length
    return currentPagination
  }

  return {
    currentPage: 1,
    booksPerPage: 5,
    totalBooks: 0,
  }
}

export function storePaginationConfigToLocalStorage(pagination: Pagination) {
  if (typeof window !== 'undefined') {
    const books = getBooksFromLocalStorage()
    pagination.totalBooks = books.length
    localStorage.setItem('pagination', JSON.stringify(pagination))
  }
}

export function cacheTheme(theme: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme)
  }
}

export function retrieveTheme(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') || 'light'
  }
  return 'light'
}
