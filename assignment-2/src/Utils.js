export function getBooksFromLocalStorage() {
  var storedBooks = JSON.parse(localStorage.getItem("books")) || [];
  return Array.isArray(storedBooks) ? storedBooks : [];
}

export function findBookById(books, id) {
  return books.find(function (book) {
    return book.id === id;
  });
}

export function generateNewBookId() {
  var books = getBooksFromLocalStorage();
  var lastBook = books[books.length - 1];
  return lastBook ? lastBook.id + 1 : 1;
}


export function addBookToLocalStorage(book) {
  var books = getBooksFromLocalStorage();
  books.push(book);
  saveBooksToLocalStorage(books);

  return books;
}

export function saveBooksToLocalStorage(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

export function findBookIndexById(books, id) {
  return books.findIndex(function (book) {
    return book.id === id;
  });
}

export function deleteBookByID(id) {
  var books = getBooksFromLocalStorage();
  var index = findBookIndexById(books, id);

  if (index !== -1) {
    books.splice(index, 1);
    saveBooksToLocalStorage(books);
  }

  return books;
}

export function getBooksByPage(pagination, filterPattern) {
  var books = getBooksFromLocalStorage();
  if (filterPattern) {
    books = books.filter(function (book) {
      return book.name.toLowerCase().includes(filterPattern.toLowerCase());
    });
  }

  const totalBooks = books.length;
  var startIndex = (pagination.currentPage - 1) * pagination.booksPerPage;
  var endIndex = startIndex + pagination.booksPerPage <= totalBooks ? startIndex + pagination.booksPerPage : totalBooks;

  return {
    data: books.slice(startIndex, endIndex),
    totalBooks: totalBooks,
    currentPage: pagination.currentPage,
  };
}


export function retrievePaginationFromLocalStorage() {
  const pagination = JSON.parse(localStorage.getItem("pagination")) || {
    currentPage: 1,
    booksPerPage: 5,
  };

  const books = getBooksFromLocalStorage();

  pagination.totalBooks = books.length;
  return pagination;
}

export function storePaginationConfigToLocalStorage(pagination) {
  const books = getBooksFromLocalStorage();
  pagination.totalBooks = books.length;
  localStorage.setItem("pagination", JSON.stringify(pagination));
}


export function cacheTheme(theme) {
  localStorage.setItem("theme", theme);
}

export function retrieveTheme() {
  return localStorage.getItem("theme") || "light";
}
