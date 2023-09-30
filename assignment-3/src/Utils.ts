import { Book, BooksWithPagination, Pagination } from './Model';

export function getBooksFromLocalStorage(): Book[] {
  const storedBooksString = localStorage.getItem('books');
  const storedBooks = storedBooksString ? JSON.parse(storedBooksString) : [];
  return Array.isArray(storedBooks) ? storedBooks : [];
}

export function findBookById(books: Book[], id: number): Book | undefined {
  return books.find((book) => {
    return book.id === id;
  });
}

export function generateNewBookId(): number {
  const books = getBooksFromLocalStorage();
  const lastBook = books[books.length - 1];
  return lastBook ? lastBook.id + 1 : 1;
}

export function addBookToLocalStorage(book: Book): Book[] {
  const books = getBooksFromLocalStorage();
  books.push(book);
  saveBooksToLocalStorage(books);

  return books;
}

export function saveBooksToLocalStorage(books: Book[]) {
  localStorage.setItem('books', JSON.stringify(books));
}

export function findBookIndexById(books: Book[], id: number): number {
  return books.findIndex((book) => {
    return book.id === id;
  });
}

export function deleteBookByID(id: number): Book[] {
  const books = getBooksFromLocalStorage();
  const index = findBookIndexById(books, id);

  if (index !== -1) {
    books.splice(index, 1);
    saveBooksToLocalStorage(books);
  }

  return books;
}

export function getBooksByPage(
  pagination: Pagination,
  filterPattern: string,
): BooksWithPagination {
  let books = getBooksFromLocalStorage();
  if (filterPattern) {
    books = books.filter((book) => {
      return book.name.toLowerCase().includes(filterPattern.toLowerCase());
    });
  }

  const totalBooks = books.length;
  const startIndex = (pagination.currentPage - 1) * pagination.booksPerPage;
  const endIndex =
    startIndex + pagination.booksPerPage <= totalBooks
      ? startIndex + pagination.booksPerPage
      : totalBooks;

  return {
    data: books.slice(startIndex, endIndex),
    totalBooks,
    currentPage: pagination.currentPage,
  };
}

export function retrievePaginationFromLocalStorage(): Pagination {
  const storedPagination = localStorage.getItem('pagination');
  const currentPagination = JSON.parse(storedPagination || '');
  const pagination = currentPagination || {
    currentPage: 1,
    booksPerPage: 5,
  };

  const books = getBooksFromLocalStorage();

  pagination.totalBooks = books.length;
  return pagination;
}

export function storePaginationConfigToLocalStorage(pagination: Pagination) {
  const books = getBooksFromLocalStorage();
  pagination.totalBooks = books.length;
  localStorage.setItem('pagination', JSON.stringify(pagination));
}

export function cacheTheme(theme: string) {
  localStorage.setItem('theme', theme);
}

export function retrieveTheme(): string {
  return localStorage.getItem('theme') || 'light';
}
