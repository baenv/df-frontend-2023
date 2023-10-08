export type Book = {
  id: number
  name: string
  author: string
  topic: string
}

export type Pagination = {
  currentPage: number
  booksPerPage: number
  totalBooks: number
}

export type BooksWithPagination = {
  data: Book[]
  totalBooks: number
  currentPage: number
}
